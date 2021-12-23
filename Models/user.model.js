module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("users", {

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your name'
                }
            }

        },

        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your phone number'
                }
            }

        }

    });

    return User;

};