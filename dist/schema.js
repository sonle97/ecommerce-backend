"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Register_1 = require("./modules/User/Register");
const Login_1 = require("./modules/User/Login");
const Me_1 = require("./modules/User/Me");
const ConfirmUserByEmail_1 = require("./modules/user/ConfirmUserByEmail");
const ForgotPassword_1 = require("./modules/User/ForgotPassword");
const ChangePassword_1 = require("./modules/User/ChangePassword");
const Logout_1 = require("./modules/User/Logout");
const GetCategories_1 = require("./modules/Category/GetCategories");
const CreateCategory_1 = require("./modules/Category/CreateCategory");
const UpdateCategory_1 = require("./modules/Category/UpdateCategory");
const GetProducts_1 = require("./modules/Product/GetProducts");
const CreateProduct_1 = require("./modules/Product/CreateProduct");
const UpdateProduct_1 = require("./modules/Product/UpdateProduct");
exports.default = (Container) => {
    return type_graphql_1.buildSchema({
        container: Container,
        resolvers: [
            Register_1.Register,
            Login_1.Login,
            Me_1.Me,
            ConfirmUserByEmail_1.ConfirmUserByEmail,
            ForgotPassword_1.ForgotPassword,
            ChangePassword_1.ChangePassword,
            Logout_1.Logout,
            GetCategories_1.GetCategories,
            CreateCategory_1.CreateCategory,
            UpdateCategory_1.UpdateCategory,
            GetProducts_1.GetProducts,
            CreateProduct_1.CreateProduct,
            UpdateProduct_1.UpdateProduct,
        ],
    });
};
//# sourceMappingURL=schema.js.map