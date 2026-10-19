// En local : back sur le port 4000. En ligne : URL du back déployé sur Vercel
const API_URL = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "http://localhost:4000"
    : "https://TON-BACK.vercel.app" // <-- remplace par l'URL réelle de ton back
 
// 1) GET : récupérer un message du back au chargement de la page
async function chargerMessage() {
    const reponse = document.getElementById("reponse")
    try {
        const res = await fetch(API_URL + "/api/message")
        const data = await res.json()
        reponse.textContent = data.message
    } catch (err) {
        reponse.textContent = "Erreur : impossible de joindre le back"
        console.error(err)
    }
}
 
// 2) POST : envoyer des données au back
async function envoyerNom() {
    const nom = document.getElementById("nom").value
    const sortie = document.getElementById("reponsePost")
    try {
        const res = await fetch(API_URL + "/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom })
        })
        const data = await res.json()
        sortie.textContent = data.message
    } catch (err) {
        sortie.textContent = "Erreur : impossible de joindre le back"
        console.error(err)
    }
}
 
document.getElementById("envoyer").addEventListener("click", envoyerNom)
chargerMessage()