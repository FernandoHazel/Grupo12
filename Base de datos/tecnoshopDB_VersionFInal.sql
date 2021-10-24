CREATE DATABASE  IF NOT EXISTS `tecnosp_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `tecnosp_db`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: tecnosp_db
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart_product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `cart_user_id` int(10) unsigned NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_quantity` int(10) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `cart_user_id` (`cart_user_id`),
  CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`cart_user_id`) REFERENCES `cart_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_product`
--

LOCK TABLES `cart_product` WRITE;
/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
INSERT INTO `cart_product` VALUES (11,39,5,'2021-10-24 21:43:32',1);
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_user`
--

DROP TABLE IF EXISTS `cart_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cart_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_user`
--

LOCK TABLES `cart_user` WRITE;
/*!40000 ALTER TABLE `cart_user` DISABLE KEYS */;
INSERT INTO `cart_user` VALUES (3,12,'2021-10-23 20:01:44'),(4,13,'2021-10-23 20:04:11'),(5,14,'2021-10-23 20:06:21'),(6,15,'2021-10-23 20:08:09'),(7,16,'2021-10-23 20:13:06'),(8,17,'2021-10-23 20:14:26');
/*!40000 ALTER TABLE `cart_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categories` (
  `id` smallint(2) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'TV'),(2,'Audio'),(3,'Cables'),(4,'Herramientas'),(5,'Smartphones'),(6,'Tablets'),(7,'Computadoras');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` smallint(2) unsigned NOT NULL,
  `seller_id` int(10) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(8,2) DEFAULT NULL,
  `stock` int(10) unsigned DEFAULT '1',
  `img` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` smallint(2) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `sold_units` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (9,2,15,'Audífonos Onikuma K2 Pro','¡Experimenta la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Onikuma K2 Pro no te pierdes ningún detalle y escuchas el audio tal y como fue diseñado por los creadores. El formato perfecto para ti. Al ser headset podrás escuchar tu música preferida, mantener llamadas telefónicas y jugar en línea desde tu PC sin perderte ningún detalle.\"\r\n  ',1149.00,24,'/images/productos/img-1635022531600.PNG',0,'2021-10-23 20:55:31',1,5),(10,2,15,'Audífonos Inalámbricos Lenovo','La tecnología BT 5.0 proporciona una velocidad de transferencia de datos rápida, un rendimiento estable y un bajo consumo de energía. Gracias a la tecnología TWS, puede usar los auriculares exclusivamente o usarlos como un par. Equipado con cargador de 250mAh para cargar los auriculares. El micrófono incorporado proporciona un sonido más claro y realista. Te brindará una experiencia de usuario perfecta. Auriculares inalámbricos Lenovo LP1S True Auriculares BT 5.0 Auriculares estéreo TWS con diafragmas dobles Hosts dobles Auriculares TWS impermeables IPX4 Auriculares deportivos con tecnología de reducción de ruido Llamada HD Auriculares con micrófono incorporado. El asistente de voz solo admite chino.\r\n',360.00,85,'/images/productos/img-1635022703011.PNG',15,'2021-10-23 20:58:23',1,3),(11,2,15,'Audífonos Tedge Diadema','Somos TEDGE – En Tedge nos propusimos crear productos de alta tecnología sin resignar diseño y calidad con los mejores precios del mercado. Audífonos Para Jugador Gamer Diadema Tedge\r\n    ',780.00,65,'/images/productos/img-1635022875209.PNG',10,'2021-10-23 21:01:15',1,0),(12,2,15,'Bocina Portátil Amlificada','Bocina de 8 pulgadas con diseño moderno portátil. Funcionamiento vía bluetooth compatible con cualquier dispositivo de reproducción. Integrada con batería recargable. La bocina ofrece un sonido natural, una gran claridad y precisión que se dispersa uniformemente por toda la habitación. Asegura potencia y calidad por igual en la reproducción de contenidos multimedia.\r\n ',359.00,38,'/images/productos/img-1635022960922.PNG',0,'2021-10-23 21:02:40',1,0),(13,2,15,'Bocina Link Bits VA626TP','Link Bits VA626TP ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Una bocina que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Olvídate del amplificador. Al ser activa solo necesitarás conectarla a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que una pasiva. Es la solución más conveniente si quieres producir música en tu casa o en un estudio, y también para DJs. Apta para aire libre. Úsala en donde quieras, esta diseñada para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.\r\n  ',454.00,12,'/images/productos/img-1635023070811.PNG',5,'2021-10-23 21:04:30',1,0),(14,2,15,'Bocina Moreka GT-113','Moreka GT-113 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Una bocina que asegura potencia y calidad por igual en la reproducción de contenidos multimedia. Olvídate del amplificador. Al ser activa solo necesitarás conectarla a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que una pasiva. Es la solución más conveniente si quieres producir música en tu casa o en un estudio, y también para DJs. Apta para aire libre. Úsala en donde quieras, esta diseñada para que tengas el mejor sonido siempre, tanto en interiores como en exteriores.',164.00,43,'/images/productos/img-1635023162739.PNG',0,'2021-10-23 21:06:02',1,7),(15,2,15,'Bocina Moreka Inalámbrica','Bocina portátil a prueba de salpicaduras CON 2 Buffer incluidos, nuestra bocino tiene un sonido de alta definición, su batería tiene una duración aproximada de 12 horas en uso ya que su batería es de 6000 mAH y cuenta con cargador de entrada USB. Con nuestra bocina también puedes incluso atender tus llamadas ya que cuenta con altavoz, además cuenta con una correa de alta calidad para que puedas llevarla a dónde desees. Nuestra bocina cuenta con conexión Bluetooth por lo que puedes conectarla a cualquier dispositivo que cuente con Bluetooth, desde tu teléfono celular, hasta tus consolas de videojuegos, laptop, etc. Además, nuestra bocina cuenta con entrada MicroSD, por lo cual no importa que no tengas un dispositivo a la mano, simplemente insertando la memoria con tu música favorita es suficiente para escuchar tus canciones con la más alta calidad y definición. ',440.00,31,'/images/productos/img-1635023266980.PNG',25,'2021-10-23 21:07:47',1,0),(16,3,15,'Cable Auxiliar 3.4 mm','Utiliza este cable auxiliar para reemplazar el cable dañado de tus audífonos que tienen conexión 3,5 mm o conviértelos en manos libres. Incorpora un módulo con micrófono y botón multifunción, así puedes conectarlo a tu celular para contestar llamadas o incluso controlar la reproducción de música1 sin tener que sacarlo de la bolsa. Es compatible con la mayoría de las marcas de audífonos en el mercado que incorporan jack 3,5 mm como Beats, Skullcandy, Bose, Sony y más.',50.00,54,'/images/productos/img-1635023359051.PNG',0,'2021-10-23 21:09:19',1,0),(17,3,15,'Cable Coaxial RG59','Cable de video (coaxial RG59) con 2 conectores tipo \'F\' de rosca, de 1,8 m de largo.',150.00,75,'/images/productos/img-1635023424012.PNG',0,'2021-10-23 21:10:24',1,1),(18,3,15,'Cable USB Elite','Conexion de USB tipo A 3.0 a conexion tipo B 3.0. Cuenta con 1.8 metros de longitud',210.00,45,'/images/productos/img-1635023581649.jpg',0,'2021-10-23 21:13:01',1,0),(19,3,15,'Cable Ethernet UTP CAT 5e','Este cable de red tiene 90 centímetros de longitud, por lo que podrás conectar a tu módem equipos como, computadoras de escritorio, laptops, Smart TV, Blu-ray o consolas de videojuegos y disfrutar de una señal de Internet más estable. Cumple con el estándar de transmisión de Categoría 5 (CAT 5e). Transmite voz y datos con una velocidad de hasta 1 000 Mbps.',99.00,45,'/images/productos/img-1635023731552.PNG',0,'2021-10-23 21:15:31',1,7),(20,7,16,'Alienwere M15','Actualización gratuita a Windows 11¹ (si está disponible, consulte a continuación Sistema operativo Windows 10 Windows 10 recupera el menú Inicio de Windows 7 e introduce nuevas funciones, como el navegador web Edge que le permite marcar páginas web en su pantalla. Pantalla Full HD de 300 Hz de 15,6. La resolución de 1920 x 1080 muestra sus juegos y películas HD con colores y claridad impresionantes. Para los jugadores que priorizan los juegos ultrarrápidos e ininterrumpidos, el Alienware m17 ofrece un panel de 300 Hz y 3 ms con una gama de colores 100% sRGB de 300 nits. Intel® Core ™ i7-10870H de décima generación. Potente rendimiento de procesamiento de 8 núcleos y 16 vías. La tecnología Intel Turbo Boost brinda potencia adicional dinámica cuando la necesita, al tiempo que aumenta la eficiencia energética cuando no la necesita. Memoria de 16 GB para multitarea y juegos avanzados.',35999.00,91,'/images/productos/img-1635041510057.PNG',25,'2021-10-24 02:11:50',1,1),(21,7,16,'Laptop 14 Hp','La laptop HP 240 G7 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina. Pantalla con gran impacto visual. Su pantalla LED de 14 y 1366x768 px de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle. Eficiencia a tu alcance. Con su procesador Intel Celeron de 2 núcleos, lograrás el desempeño que necesitas para navegar y trabajar. Podrás usar los programas más esenciales, llevar a cabo tus tareas y organizar tu vida diaria. Un procesador exclusivo para los gráficos. \r\n ',8999.00,57,'/images/productos/img-1635041595205.PNG',0,'2021-10-24 02:13:15',1,0),(22,7,16,'Laptop Huawei MateBook D15','La laptop Huawei MateBook D15 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina. Pantalla con gran impacto visual Su pantalla LCD de 15.6 y 1920x1080 px de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle. Eficiencia a tu alcance. Su procesador Intel Core i5 de 4 núcleos, está pensado para aquellas personas generadoras y consumidoras de contenidos. Con esta unidad central, la máquina llevará a cabo varios procesos de forma simultánea, desde edición de videos hasta retoques fotográficos con programas profesionales. Potente disco sólido. El disco sólido de 512 GB hace que el equipo funcione a gran velocidad y por lo tanto te brinda mayor agilidad para operar con diversos programas. \r\n ',18429.00,56,'/images/productos/img-1635041714185.PNG',0,'2021-10-24 02:15:14',1,0),(23,7,16,'Laptop Lenovo IdeaPad 14IIL05','La laptop Lenovo IdeaPad 3 fue pensada para hacer tu vida más sencilla. Su diseño elegante e innovador y su comodidad para transportarla, la convertirá en tu PC favorita. Cualquier tarea que te propongas, ya sea en casa o en la oficina, la harás con facilidad gracias a su poderoso rendimiento. Pantalla con gran impacto visual. Su pantalla de 14 y 1920x1080 px de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle. Eficiencia a tu alcance. Su procesador Intel Core i5 de 4 núcleos, está pensado para aquellas personas generadoras y consumidoras de contenidos. Con esta unidad central, la máquina llevará a cabo varios procesos de forma simultánea, desde edición de videos hasta retoques fotográficos con programas profesionales. Potente disco sólido. ',12199.00,98,'/images/productos/img-1635041802513.PNG',0,'2021-10-24 02:16:42',1,0),(24,4,16,'Cautín de estación Weller de 95 W','Alta versatilidad para distintas aplicaciones. Esta estación para soldar de nueva generación, de un solo canal, está pensada para satisfacer todas tus necesidades. Tiene control digital por medio de botones para seleccionar la temperatura, y display LCD que permite observar el aumento o disminución gradual de la temperatura hasta llegar al valor establecido, así siempre estarás seguro de trabajar con el calor adecuado. El rango de selección es de 50 a 450 °C (150 °F a 850 °F). También permite hacer ajustes de tiempo de espera automático (standby), rango de regulación automático, y bloqueo antimanipulación para evitar cambiar la temperatura accidentalmente. Incluye unidad con descanso de seguridad para colocar el cautín, con depósito para esponja y fibra limpiadora.\"\r\n  ',7890.00,45,'/images/productos/img-1635041880830.PNG',0,'2021-10-24 02:18:01',1,0),(25,4,16,'Multímetro profesional auto rango','Mide resistencia, voltaje de corriente alterna o directa, intensidad de corriente, capacitancia y continuidad audible.',970.00,35,'/images/productos/img-1635041971651.jpg',30,'2021-10-24 02:19:31',1,2),(26,4,16,'Pinza ponchadora de plug RJ45','Pinza telefónica de metal para conectores de 8 contactos RJ45 (crimpadora RJ45), con adaptador para corte y armado de conectores. ideal para armar cables Ethernet.\r\n',295.00,45,'/images/productos/img-1635042045329.PNG',30,'2021-10-24 02:20:45',1,1),(27,4,16,'Portafolio de herramientas para mantenimiento de computadoras','Portafolio de herramientas para mantenimiento de computadoras',395.00,78,'/images/productos/img-1635042109443.PNG',60,'2021-10-24 02:21:49',1,0),(28,4,16,'Tacómetro digital láser','Este tacómetro mide las revoluciones por minuto o número de vueltas de equipos como motores, poleas o aspas, con la máxima precisión.',1490.00,665,'/images/productos/img-1635042184803.PNG',20,'2021-10-24 02:23:04',1,0),(29,5,16,'SAMSUNG Smartphone A11 Blanco 64GB','Características técnicas Galaxy A11 Pantalla: Tamaño: 6,4 pulgadas con resolución HD+ (1560 x 720). Tipo: TFT Infinity-O. Procesador: 8 núcleos a una velocidad de 1,8 GHz. Memoria: 2/3 GB de RAM. Almacenamiento: 32 GB (Ampliables con microSD). Cámara trasera: Sensor principal: 13 Mpx f/1.8. Gran angular: 5 Mpx f/2.2. Sensor profundidad: 2 Mpx f/2.4 Cámara frontal: 8 Mpx f/2.0 Batería: 4.000 mAh. Carga rápida 15W. Puertos: USB-C Otros: sensor de huellas trasero, reconocimiento facial. Dimensiones: 161.4 x 76.3 x 8 mm. Peso: 177 gramos.\r\n  ',2858.00,64,'/images/productos/img-1635042256502.PNG',15,'2021-10-24 02:24:16',1,0),(30,5,16,'Xiaomi Poco M3 Pro 5G','Diagonal de pantalla visible 7\' / 17 cm',3939.00,559,'/images/productos/img-1635042325649.PNG',15,'2021-10-24 02:25:25',1,0),(31,5,17,'XIAOMI REDMI 9A','El Xiaomi Redmi 9A cuenta con una pantalla HD+ inmersiva de 6.53” que te permitirá sumergirte en una experiencia virtual, cuanta con un certificado de protección de luz azul baja de esta manera tus ojos estarán tranquilos incluso después de pasar largas horas frente al teléfono. Haz que tus recuerdos perduren con la cámara IA de 13 MP, captura tus momentos favoritos con colores vivos. Hazte selfies con total facilidad utilizando la palma de tu mano, simplemente muestra la palma de tu mano a la cámara para sacar la foto, que podrás almacenar en la memoria interna de 32GB sin preocuparte ya que es expandible con una MicroSD. Con el desbloqueo facial ahora será más fácil acceder a tu teléfono y tu serás el único con esa clave, de esta manera tu información siempre estará protegida. Un teléfono potente requiere de una batería de larga duración, con los 5000 mAh siempre estarás comunicado, estarás jugando, escucharas tu música preferida y todo esto lo harás sin preocuparte por la batería.\r\n',2194.00,250,'/images/productos/img-1635088229809.PNG',50,'2021-10-24 15:10:30',1,3),(32,6,17,'Lenovo Tab M10 Plus','Aspecto y tacto premium con cubierta trasera de metal y bisel delgado y estrecho. Disfruta de tus vídeos favoritos en el 10. visualización FHD de 3 con tecnología TDDI. Rápido y potente procesador Octa-Core con hasta 2. Frecuencia principal de 3 GHz para un rendimiento rápido. No te pierdas ni un momento con cámaras traseras de 8 MP + 5 MP delanteras, micrófonos duales y 2 altavoces laterales sintonizados con Dolby Atmos. El modo infantil incluye contenido dedicado para niños, con control de padres y protección visual especializada. Alertas de postura y entorno accidentado también disponibles. Manténgase conectado con WiFi 802. 11 a/b/g/n/ac, 2. 4 GHz y 5 GHz Dual Band, y Bluetooth 5. 0\r\n   ',3590.00,54,'/images/productos/img-1635088342746.PNG',30,'2021-10-24 15:12:22',1,1),(33,6,17,'SAMSUNG A7 Tablet 10.4 WiFi 32GB Gris','Diseño delgado y elegante: transmite y navega en una visualización ultra ancha de 10,4\' (1) diseñada para dar vida a tu contenido sin tener que pesarte. La cámara frontal orientada al paisaje te permite pasar entre entretenimiento y videollamadas sin problemas. Sonido envolvente de DOLBY ATMOS DOLBY: Con un sistema de cuatro altavoces mejorado que reproduce todo lo que aparece en el sonido envolvente Dolby Atmos, siempre sentirás como si estuvieras escuchando desde la primera fila. ENTRETENIMIENTO PREMIUM EN NOSOTROS: Con la compra de Galaxy Tab A7, obtén dos meses de gratis YouTube Premium (2) y seis meses de Spotify Premium. (3). Haz más de lo que te gusta: las potentes velocidades de procesamiento y la memoria mejorada (4) te permiten hacer más, y mantener más cosas que te gustan: aplicaciones, vídeos, listas de reproducción y mucho más.\r\n  ',4331.00,21,'/images/productos/img-1635088436884.PNG',0,'2021-10-24 15:13:56',1,0),(34,6,17,'SAMSUNG Galaxy Tab A T290 Tablet Galaxy Tab A 8 Plata, Plata','TABLET SAMSUNG GALAXY TAB A 8P ANDROID 32 GB RAM 2 GB COLOR PLATA SM-T290NZSAMXO',2899.00,45,'/images/productos/img-1635088507686.PNG',0,'2021-10-24 15:15:07',1,0),(35,1,17,'Electriq 43 pulgadas Android Smart HDR 4K','Este modelo está pensado para que puedas despejar tu campo visual. El sector donde coloques el televisor se verá mucho más prolijo porque los cables estarán ocultos, ordenados y organizados, ¡notarás la diferencia!\r\n  ',7368.00,24,'/images/productos/img-1635088606570.jpg',0,'2021-10-24 15:16:46',1,1),(36,1,17,'Hisense 43 A6G 4K','HDR Dolby Vision y HDR10. transforma tu televisión en un centro de entretenimiento. La tecnología de imagen para cine brinda un realismo asombroso. 4K Ultra HD, Motion Rate 120. Con más de 8.3 millones de pixeles, cuenta con una potente luz LED que crea una imagen más nítida y colorida. Con la tecnología Motion Rate, la serie A6 te brinda una máxima emoción al suavizar las escenas de acción en movimiento rápido. DTS Virtual: X. Esta tecnología crea una experiencia de audio inmersiva al virtualizar el contenido. TUV Low Blue Light, las pantallas con esta tecnología ayudan a prevenir la fatiga visual, la irritación o la tensión, de forma que los usuarios puedan trabajar, jugar o ver contenido durante horas y horas. Android TV. Ten al alcance más de 400,000 contenidos. Disfruta películas, series de TV, música y videojuegos. También puedes transmitir fotos, videos y música desde tu teléfono inteligente a tu gran pantalla. ',8799.00,65,'/images/productos/img-1635088696820.jpg',0,'2021-10-24 15:18:16',1,0),(37,1,17,'Pantalla 32 Pulgadas Led Blux 32bxhd Hd','Pasa momentos de entretenimiento con la pantalla Blux modelo 32BXHD, la espectacular definición HD que implementa permitirá visualizar tus programas, películas y series favoritas con una gran calidad de imagen. Cuenta con un panel LED de 32 pulgadas, de esta manera no te perderás de ningún detalle. Conecta tus dispositivos a través de las 3 entradas HDMI y una entrada USB que incorpora y proyecta el contenido multimedia que se encuentra almacenado en ellos. Este producto es completamente nuevo y viene con su garantía de fábrica según aplique para cada marca. Si tienes dudas de cómo aplicarla puedes escribirnos por medio de tu compra.\r\n ',2799.00,24,'/images/productos/img-1635088775684.PNG',0,'2021-10-24 15:19:35',1,0),(38,1,17,'Smart TV Ghia G50DUHDS8-Q LED 4K','Con el Smart TV G50DUHDS8-Q accederás a las aplicaciones donde se encuentran tus contenidos favoritos. Además, podrás navegar por Internet, interactuar en redes sociales y divertirte con videojuegos. Vive en 4K. La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte. Más allá de ver televisión. Su función Screen Share permite duplicar la pantalla de tu smartphone, tablet o PC para que aparezca en la TV. De esta forma, visualizarás todo tipo de contenido: material audiovisual, documentos de trabajo, correos electrónicos, etc.\r\n  ',6499.00,58,'/images/productos/img-1635088851485.PNG',10,'2021-10-24 15:20:51',1,0),(39,1,17,'Smart TV Samsung Series 8 UN50TU8000FXZX LED 4K 50 110V - 127V','Samsung es reconocida a nivel mundial como una empresa líder en la industria tecnológica. Todos sus productos son diseñados con una calidad superior y pensados para contribuir a un futuro mejor. Por eso, hará que disfrutes de una experiencia incomparable. Con el Smart TV UN50TU8000 accederás a las aplicaciones donde se encuentran tus contenidos favoritos. Además, podrás navegar por Internet, interactuar en redes sociales y divertirte con videojuegos. Vive en 4K. La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte. Un sonido que te envuelve. Vas a sentir que proviene desde todas las direcciones posibles, lo cual enriquece la percepción del mismo. Los diálogos de tus series de fin de semana o la música de tus cantantes preferidos cobrarán otro significado. Más allá de ver televisión. \r\n    ',10699.00,54,'/images/productos/img-1635090501252.PNG',0,'2021-10-24 15:48:21',1,0),(40,1,17,'Smart TV TCL 32S331-MX LED HD 32 110V','TCL es una de las empresas líderes en la industria global de televisores, dedicada a la investigación y desarrollo de productos electrónicos. Orientada a la satisfacción de sus clientes, se distingue por proveer una excelente experiencia a quienes adquieran y usen sus diferentes líneas de electrodomésticos. Con el Smart TV 32S331-MX accederás a las aplicaciones donde se encuentran tus contenidos favoritos. Además, podrás navegar por Internet, interactuar en redes sociales y divertirte con videojuegos. Sumérgete en la pantalla. Su resolución HD te presentará imágenes con gran detalle y alta definición. Ahora todo lo que veas cobrará vida con brillo y colores más reales.',4699.00,87,'/images/productos/img-1635090588911.PNG',25,'2021-10-24 15:49:49',1,0),(41,6,17,'Tablet Samsung Galaxy Tab E Lite 7','Tablet Samsung Galaxy Tab E Lite 7 \\\", 8GB, 1024 x 600 Pixeles, Android 4.4, Bluetooth 4.0, Blanco',2700.00,5,'/images/productos/img-1635090666537.jpg',0,'2021-10-24 15:51:06',1,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `purchases` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `individual_price` decimal(8,2) DEFAULT NULL,
  `product_quantity` int(10) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,23,10,612.00,2),(2,23,17,150.00,1),(3,23,32,2513.00,1),(5,26,26,206.50,1),(6,27,20,26999.25,1),(7,28,10,306.00,1),(8,28,19,198.00,2),(9,28,35,7368.00,1),(10,29,31,1097.00,1),(11,30,9,5745.00,5),(12,31,25,1358.00,2),(13,31,41,8100.00,3),(14,32,14,656.00,4),(15,33,14,492.00,3),(16,33,19,495.00,5),(17,34,31,2194.00,2);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tickets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `purchase_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (23,12,'2021-10-24 21:26:42',3275.00),(26,12,'2021-10-24 21:35:44',206.50),(27,13,'2021-10-24 21:36:41',26999.25),(28,13,'2021-10-24 21:37:34',7872.00),(29,13,'2021-10-24 21:38:21',1097.00),(30,14,'2021-10-24 21:39:29',5745.00),(31,14,'2021-10-24 21:40:20',9458.00),(32,12,'2021-10-24 21:41:40',656.00),(33,14,'2021-10-24 21:42:30',987.00),(34,12,'2021-10-24 22:00:28',2194.00);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role_id` smallint(2) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `user_role_id` (`user_role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_role_id`) REFERENCES `users_roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@tecno-shop.com','$2b$10$EJYGXIe72.MeV0jWssJO8ujZiYTXShCyqrthIvS6js0YEcvc5Mwue',3,1),(12,'cliente1@gmail.com','$2b$10$KZwYd5RIwel9UZlThWzFk.Kpm.jdCjnnft5qU48dctCElkOveSWWy',1,1),(13,'cliente2@gmail.com','$2b$10$q9hdGIlwctOBgStZeaUmc.UI7MPlBH.LPMWJULRYQkqxCNzmWIeme',1,1),(14,'cliente3@gmail.com','$2b$10$Ij6DeVKfOwtZDQIWgRP2Cu/RruGGHdFrYSI3MItylUPHXOFuZwn9W',1,1),(15,'vendedor1@gmail.com','$2b$10$yquFp5LtGeIq1JD9fzfPZ.AwXQwndPpiGTJtoadSIj/hyllgKYL0a',2,1),(16,'vendedor2@gmail.com','$2b$10$vGAD7l8vEcATafr6XoK/nOo2AFFVd4Mh6IFt8ooGvoIPHTGvgTkVG',2,1),(17,'vendedor3@gmail.com','$2b$10$KOqNTtyTuMIDDX/6anaz3eP9KMjqYCBpMkBnEyKo3AvDyOM33wTMC',2,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_info`
--

DROP TABLE IF EXISTS `users_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `first_name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` smallint(2) unsigned DEFAULT NULL,
  `profile_img` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_info`
--

LOCK TABLES `users_info` WRITE;
/*!40000 ALTER TABLE `users_info` DISABLE KEYS */;
INSERT INTO `users_info` VALUES (1,1,'Admin','Tecnoshop',30,'/images/usuarios/default.png','2021-10-23 19:55:01'),(2,12,'Edgar','Sanchez',33,'/images/usuarios/img-1635019304034.png','2021-10-23 20:01:44'),(3,13,'Juan','Perez',43,'/images/usuarios/img-1635019451462.jpg','2021-10-23 20:04:11'),(4,14,'Jadey','Jonn',22,'/images/usuarios/img-1635019581205.jpg','2021-10-23 20:06:21'),(5,15,'Sofia','Aleman',25,'/images/usuarios/img-1635019689486.jpg','2021-10-23 20:08:09'),(6,16,'Felipe','Guarnizo',26,'/images/usuarios/img-1635019985967.png','2021-10-23 20:13:06'),(7,17,'Hugo','Ramirez',34,'/images/usuarios/img-1635020066540.jpg','2021-10-23 20:14:26');
/*!40000 ALTER TABLE `users_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users_roles` (
  `id` smallint(2) unsigned NOT NULL AUTO_INCREMENT,
  `user_role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,'user'),(2,'seller'),(3,'admin');
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-24 17:05:24
