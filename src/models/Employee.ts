import {Sequelize} from "sequelize";
import {DataTypes} from "sequelize";

const sequelize = new Sequelize('sqlite::memory:')

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    direct_reports: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})


export default Employee