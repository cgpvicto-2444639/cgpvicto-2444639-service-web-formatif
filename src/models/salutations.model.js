import pool from '../config/db.js';

export const getSalutations = async ()=> {
    const requete = `SELECT code_langue, langue, message FROM salutations`;

    try {
        const [resultats] = await pool.query(requete);
        return resultats;
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }

};

export const ajouterSalutation = async (code_langue, langue, message) => { 
    const requete = `INSERT INTO salutations (code_langue, langue, message) VALUES (?, ?, ?)`;
    const params = [code_langue, langue, message];

    try{
        const [resultat] = await pool.query(requete, params);
        return{
            id: resultat.insertId,
            code_langue,
            langue,
            message
        };
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

export const salutationsLangue = async (code_langue) => {
    const requete = `SELECT code_langue, langue, message FROM salutations WHERE code_langue = ?`;
    const params = [code_langue]

    try{
        const [resultats] = await pool.query(requete, params);
        return resultats;
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

export default{
    getSalutations,
    ajouterSalutation,
    salutationsLangue
}