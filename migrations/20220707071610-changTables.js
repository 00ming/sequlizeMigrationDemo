'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    console.log(123)
    const transaction = await queryInterface.sequelize.transaction();
    const [result,Statement] =  await queryInterface.sequelize.query(`select name from sqlite_master where type = 'table' and name like 'User%' `,{})
    if (result) {
      try {
        // console.log(alert)
        for (const item of result) {
          if (item.name !== 'pq_message_system_center') {
             await queryInterface.addColumn(item.name,'message13',{type:Sequelize.DataTypes.STRING},{ transaction })
            // await queryInterface.removeColumn(item.name,'message12',)
          }
        }
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        console.log(err)
        throw err;
      }
    }

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const [result,Statement] =  await queryInterface.sequelize.query(`select name from sqlite_master where type = 'table' and name like 'User%' and name !='pq_message_system_center'`,{})
    if (result) {
      try {
        for (const item of result) {
          if (item.name !== 'pq_message_system_center') {
            // await queryInterface.addColumn(item.name,'message12',{type:Sequelize.DataTypes.STRING},{ transaction })
            await queryInterface.removeColumn(item.name,'message13',{ transaction })
          }
        }
        await transaction.commit()
      } catch (e) {
        console.log(e)
        await transaction.rollback();
        throw e;
      }

    }
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

  }
};
