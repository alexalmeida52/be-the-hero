const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const ong_id = req.headers.authorization;

        const incidents = await connection('incidents')
            .where('ongs_id', ong_id)
            .select('*');

        if(!incidents)
            return res.status(401).send();
        
        return res.status(200).json(incidents);
    }
}