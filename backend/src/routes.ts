import express, { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./controllers/user/middlewares/isAutenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadConfig.upload('./files/img/'));

//Rotas User
router.post("/user", new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);

//O middleware isAuthenticated só permite que usuários autenticados acessem a rota
router.get('/detail', isAuthenticated, new DetailUserController().handle);

//Rotas Category
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categories', isAuthenticated, new ListCategoryController().handle);

//Rotas Product
router.post('/product', isAuthenticated, upload.single('banner'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListProductsByCategoryController().handle);

//Rotas Order
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/add-item', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove-item', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/order', isAuthenticated, new ListOrderController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export default router;