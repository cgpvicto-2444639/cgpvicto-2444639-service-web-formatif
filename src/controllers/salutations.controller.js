import { salutations, ajouterSalutation } from '../models/salutations.model.js';

export function obtenirListeSalutations(req, res){
    res.json(salutations);
}

export function obtenirListeSalutationHasard(req, res) {
    const langue = req.query.langue;

    if(langue != null){
        const languesValides = ['fr', 'en', 'es', 'de'];

        if(!languesValides.includes(langue)) {
            return res.status(404).json({
                message: `Erreur, le code de langue ${langue} n'existe pas`
            });
        }

        const salutationsFiltered = salutations.filter(s => s.code_langue === langue);

        if(salutationsFiltered.length === 0){
            return res.status(404).json({
                message: `Erreur, le code de langue ${langue} n'existe pas`
            });
        }

        const randomIndex = Math.floor(Math.random() * salutationsFiltered.length);
        return res.json(salutationsFiltered[randomIndex]);
    }

    const randomIndex = Math.floor(Math.random() * salutations.length);
    res.json(salutations[randomIndex]);
}

export function creerSalutation(req, res) {
    const { code_langue, langue, message } = req.body;

    if(!code_langue || !langue || !message){
        return res.status(400).json({
            message: "Erreur, les paramètres code_lanue, langue et message sont obligatoires"
        });
    }

    ajouterSalutation(code_langue, langue, message);

    res.status(201).json({
        message: "Salutation ajoutée",
        salutation: message
    });
}