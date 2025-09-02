import express from "express";
import { fetchMenuById } from "../repositories/menuRepo.js";
import { fetchDishesByMenuId } from "../repositories/dishRepo.js";

const router = express.Router();

// Public menü görüntüleme (QR kod ile erişilecek)
router.get("/menu/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Menü bilgilerini getir
    const menu = await fetchMenuById(id);
    if (!menu) {
      return res.status(404).json({
        status: 404,
        message: "Menü bulunamadı"
      });
    }

    // Menüye ait yemekleri getir
    const dishes = await fetchDishesByMenuId(id);
    
    // Public response (şifre bilgisi olmadan)
    const publicMenu = {
      id: menu.id,
      title: menu.title,
      createdAt: menu.createdAt,
      dishes: dishes.map(dish => ({
        id: dish.id,
        name: dish.name,
        description: dish.description,
        price: dish.price,
        imageUrl: dish.imageUrl
      }))
    };

    res.json({
      status: 200,
      message: "Menü başarıyla getirildi",
      data: publicMenu
    });
  } catch (error) {
    next(error);
  }
});

// QR kod görüntüleme endpoint'i
router.get("/qr/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Menü bilgilerini getir
    const menu = await fetchMenuById(id);
    if (!menu) {
      return res.status(404).json({
        status: 404,
        message: "Menü bulunamadı"
      });
    }

    // QR kod yoksa hata döndür
    if (!menu.qrCode) {
      return res.status(404).json({
        status: 404,
        message: "Bu menü için QR kod bulunamadı"
      });
    }

    // HTML sayfası döndür
    const html = `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${menu.title} - QR Kod</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
                  background-color: #f5f5f5;
              }
              .container {
                  background: white;
                  padding: 30px;
                  border-radius: 10px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              h1 {
                  color: #333;
                  margin-bottom: 20px;
              }
              .qr-code {
                  margin: 20px 0;
                  padding: 20px;
                  border: 2px solid #ddd;
                  border-radius: 10px;
                  background: white;
              }
              .qr-code img {
                  max-width: 300px;
                  height: auto;
              }
              .menu-info {
                  text-align: left;
                  margin: 20px 0;
                  padding: 15px;
                  background: #f9f9f9;
                  border-radius: 5px;
              }
              .download-btn {
                  background: #007bff;
                  color: white;
                  padding: 10px 20px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  text-decoration: none;
                  display: inline-block;
                  margin: 10px;
              }
              .download-btn:hover {
                  background: #0056b3;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>${menu.title}</h1>
              <div class="menu-info">
                  <p><strong>Menü ID:</strong> ${menu.id}</p>
                  <p><strong>Oluşturulma Tarihi:</strong> ${new Date(menu.createdAt).toLocaleDateString('tr-TR')}</p>
              </div>
              
              <div class="qr-code">
                  <h3>QR Kod</h3>
                  <img src="${menu.qrCode}" alt="QR Kod" />
                  <p><small>Bu QR kodu tarayarak menüyü görüntüleyebilirsiniz</small></p>
              </div>
              
              <div>
                  <a href="${menu.qrCode}" download="menu_${menu.id}_qr.png" class="download-btn">
                      QR Kodu İndir
                  </a>
                  <a href="/menu/${menu.id}" class="download-btn">
                      Menüyü Görüntüle
                  </a>
              </div>
          </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    next(error);
  }
});

export default router;
