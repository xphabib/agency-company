const sequelize = require('../config/database');
const User = require('./User');

(async () => {
    try {
        await sequelize.sync({ alert: true });
        console.log('All Models were synchronized successfully.');
    } catch (error) {
        console.error('Erro synchronizing models:', error);
    }
})();

module.exports = {
    sequelize,
    User
}