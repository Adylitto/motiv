import {
    createParser,
} from "eventsource-parser";


export async function OpenAIStream(payload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;

    const { company, experience, skills, name, position } = payload.formData;


    const prompt = `Je suis demandeur d'emploi nommé ${name} et j'ai besoin de votre aide pour rédiger une parfaite
    lettre de motivation. je postule pour travailler chez ${company} en tant que ${position}, et possède ${experience} années d'expérience et les compétences suivantes : ${skills}.
    Pouvez-vous s'il vous plaît m'aider à écrire une lettre de motivation parfaite qui met en évidence mon expérience et mes compétences pertinentes,
    et expliquer pourquoi ils conviennent parfaitement au poste? Rendez-le engageant et persuasif,
    mais restez professionnel. Merci!`

    const config = {
        prompt,
        temperature: 0.7,
        max_tokens: 600,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        model: 'text-davinci-003',
        stream: true
    }

    const res = await fetch("https://api.openai.com/v1/completions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPEN_AI_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify(config),
    })

    const stream = new ReadableStream({
        async start(controller) {
            // callback
            function onParse(event) {
                if (event.type === "event") {
                    const data = event.data;
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === "[DONE]") {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].text;
                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            // this is a prefix character (i.e., "\n\n"), do nothing
                            return;
                        }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
                    } catch (e) {
                        // maybe parse error
                        controller.error(e);
                    }
                }
            }

            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks and invoke an event for each SSE event stream
            const parser = createParser(onParse);
            // https://web.dev/streams/#asynchronous-iteration
            for await (const chunk of res.body) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });

    return stream;
}
