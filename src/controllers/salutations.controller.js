import { getSalutations, ajouterSalutation, salutationsLangue} from '../models/salutations.model.js';

export async function getSalutationsListe(req, res){
    try {
        const salutations = await getSalutations();
        res.json(salutations);
    } catch (erreur) {
        res.status(500).json({
            message: "Erreur lors de la récupération des salutations",
            erreur: erreur.message
        });
    }
}

export async function creerSalutation(req, res) {
    const { code_langue, langue, message } = req.body;

    if(!code_langue || !langue || !message){
        return res.status(400).json({
            message: "Erreur, les paramètres code_lanue, langue et message sont obligatoires"
        });
    }

    try {
        const nouvelleSalutation = await ajouterSalutation(code_langue, langue, message);

        res.status(201).json({
            message: "Salutation ajoutée",
            salutation: nouvelleSalutation
        });
    } catch (erreur){
        res.status(500).json({
            message: "Erreur lors de l'ajout de la salutation",
            erreur: erreur.message
        });
    }
}

export async function getSalutationsLangue(req, res){
    if(!req.params.code_langue || String(req.params.code_langue) == 0){
        res.status(400);
        res.send({
            message: "Le code de la langue est obligatoire et ne peux pas être vide"
        });
        return;
    }

    try {
        const salutations = await salutationsLangue(req.params.code_langue);
        res.json(salutations);
    } catch (erreur) {
        console.log('Erreur : ', erreur);
        res.status(404);
        res.send({
            message: "Erreur lors de la récupération du code de langue de la salutation" + req.params.id
        });
    }
}