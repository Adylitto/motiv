import { useState, React, useRef, useEffect} from 'react';
import styles from "../styles/Generate.module.css";
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    skills: '',
    position: '',
    experience: ''
  });
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      })
      
      if (!result.ok) {
        setError("Vérifies ta connection et ré-essayes!");
      }
  
      // This data is a ReadableStream
      const data = result.body;
      if (!data) {
        return;
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResult((prev) => prev + chunkValue);
      }
    } catch (err) {
      setError(err);
    }

    setIsLoading(false);
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }

    toast.success("Copié!", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "copy-id",
      pauseOnHover: false,
    });
  }

  const errorToast = () => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "error-id",
      pauseOnHover: false,
    });
  }

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [result]);

  return (
    <>
      <div className={styles.container}>
        <Header />
        <ToastContainer />
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <p>Génères ta <span>lettre de motivation </span> en quelques secondes.</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Nom de la société:
              <input type="text" name="company" value={formData.company} onChange={handleChange} />
            </label>
            <br />
            <label>
              Ton nom complet:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
              Le descriptif du poste:
              <input type="text" name="position" placeholder='copier coller le descriptif du poste' value={formData.position} onChange={handleChange} />
            </label>
            <br />
            <label>
              Tes skills (atouts):
              <textarea name="skills" placeholder='Décrire vos compétences pertinentes pour ce poste' value={formData.skills} onChange={handleChange} />
            </label>
            <br />
            <label>
              Tes années d Experience:
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
            </label>
            <br />
            <div className={styles.buttons}>
              <Button text={"Générer"} />
              {isLoading && <Loader />}
            </div>
          </form>
          <a href="https://www.buymeacoffee.com/adyl" target="_blank">
                    <img src="https://img.buymeacoffee.com/button-api/?text=M'offrir un Kawa!😉&emoji=&slug=adyl&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
                </a>
          <div className={styles.bottom}>
            {error ? errorToast() && <div style={{display: "none"}}></div> : result && 
            <div className={styles.result} ref={ref} key={"prompt"}>
              <button className={styles.button} onClick={handleCopy}>Copier</button>
              {result}
            </div>}
          </div>
          
        </div>
      </div>
    </>
  )
}


export default App;