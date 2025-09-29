DROP DATABASE IF EXISTS petcafe;
CREATE DATABASE IF NOT EXISTS petcafe;
USE petcafe;

-- 1. USERS (improved with NOT NULL constraints and proper lengths)
CREATE TABLE IF NOT EXISTS users (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
username VARCHAR(255) UNIQUE,
password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ANIMALS (added missing fields and constraints)
CREATE TABLE IF NOT EXISTS animals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 0),
    animal_type ENUM('DOG', 'CAT') NOT NULL,
    gender ENUM('MALE', 'FEMALE') NOT NULL, -- Added this missing column
    description TEXT,
    location VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    status ENUM('PENDING', 'CONFIRMED', 'CANCELED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_animal_type (animal_type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PRODUCTS (improved with constraints)
CREATE TABLE IF NOT EXISTS products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    product_type ENUM('COFFEE', 'TEA', 'DESSERT') NOT NULL,
    image_url VARCHAR(255),
    stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_product_type (product_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. RESERVATIONS (improved with proper datetime)
CREATE TABLE IF NOT EXISTS reservations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    reservation_datetime DATETIME NOT NULL,
    duration_minutes INT DEFAULT 60 CHECK (duration_minutes > 0),
    status ENUM('PENDING', 'CONFIRMED', 'CANCELED') DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_reservation_datetime (reservation_datetime),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ADOPTION REQUESTS (improved with constraints)
CREATE TABLE IF NOT EXISTS adoption_requests (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    animal_id BIGINT NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELED') DEFAULT 'PENDING',
    message TEXT NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response_date TIMESTAMP NULL,
    response_notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE,
    UNIQUE KEY unique_adoption_request (user_id, animal_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. FAVORITES (unchanged but with proper constraints)
CREATE TABLE IF NOT EXISTS favorites (
    user_id BIGINT NOT NULL,
    animal_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, animal_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- INSERTS (updated to match new schema)

-- Users
INSERT INTO users (id, name, username, password) VALUES
(1, 'Admin User 1', 'ema.admin', 'parola'),
(2, 'Admin User 2', 'test.admin', '123'),
(3, 'Test User', 'test', 'test'),
(4, 'Ema', 'ema', 'ceva');

INSERT INTO animals (id, name, breed, age, animal_type, gender, description, location, image_url) VALUES
(1, 'Rex', 'Golden Retriever', 3, 'DOG', 'MALE', 'Rex is a highly sociable and energetic dog who loves to be the center of attention. He enjoys running outdoors and retrieving objects. Ideal for active families with children and spacious gardens. Rex needs daily physical activity and constant interaction. He is basic trained and responds well to simple commands. Friendly with other animals and adores human company.', 'Cluj', '/images/rex.jpg'),
(2, 'Luna', 'British Shorthair', 2, 'CAT', 'FEMALE', 'Luna is an independent yet affectionate cat who prefers a calm environment. She likes being petted but on her own terms. Curious and intelligent, she spends time observing her surroundings. Luna is perfect for singles or couples without small children. Initially reserved with strangers but becomes loyal once trust is built. Prefers quiet activities and high spots for observation.', 'București', '/images/luna.jpg'),
(3, 'Toby', 'Beagle', 1, 'DOG', 'MALE', 'Toby is a curious and energetic pup who loves to explore by scent. He has an adventurous spirit and an excellent nose. Playful and lovable, but can be stubborn when following an interesting smell. Needs regular mental and physical stimulation. Gets along well with other dogs and children, but might chase small animals. Suitable for active families who can invest time in training.', 'Timișoara', '/images/toby.jpg'),
(4, 'Milo', 'Maine Coon', 4, 'CAT', 'MALE', 'Milo is a large and gentle cat, a true gentle giant. Extremely affectionate and behaves almost like a dog, following his owner around the house. Loves being groomed and enjoys attention. Friendly with everyone, including kids and other pets. Very vocal and will chat with his owner. Suitable for all family types. Needs space due to his size and enjoys interactive toys.', 'Iași', '/images/milo.jpg'),
(5, 'Bella', 'Labrador Retriever', 2, 'DOG', 'FEMALE', 'Bella is a gentle and patient dog with a balanced personality. Loves water and swimming, getting excited at the sight of a lake or pool. Loyal and protective with her family but friendly with strangers. Excellent with children of all ages. Trained and quick to learn new commands. Needs moderate daily exercise and mental activities. Ideal for active families who enjoy nature.', 'Constanța', '/images/bella.jpg'),
(6, 'Oliver', 'Siamese', 3, 'CAT', 'MALE', 'Oliver is a very intelligent and vocal Siamese cat. Loves constant communication and being in the spotlight. Extremely attached to his owner and may develop separation anxiety. Requires lots of mental stimulation and interaction. Curious and explores every corner of the house. Best suited for people who work from home or spend a lot of time indoors. Doesn’t always get along with other animals and prefers being the only cat.', 'Brașov', '/images/oliver.jpg'),
(7, 'Charlie', 'French Bulldog', 2, 'DOG', 'MALE', 'Charlie is a playful French Bulldog with a charismatic personality. Bursts of energy followed by lounging on the couch. Makes funny faces and snores while sleeping. Loyal and affectionate, but can be stubborn. Sensitive to extreme temperatures and needs careful exercise on hot days. Great for apartments and small homes. Gets along with older children and adults. Requires consistent training due to stubbornness.', 'Oradea', '/images/charlie.jpg'),
(8, 'Chloe', 'Ragdoll', 1, 'CAT', 'FEMALE', 'Chloe is a young Ragdoll cat who truly lives up to her name – she completely relaxes when held. Gentle and calm, she prefers quiet activities. Very affectionate and will follow her owner around the house. Ideal for peaceful families or elderly people. Has a low hunting instinct and prefers relaxed play. Friendly with all family members and easily adapts to changes. Requires regular grooming due to her long fur.', 'Cluj', '/images/chloe.jpg'),
(9, 'Max', 'German Shepherd', 5, 'DOG', 'MALE', 'Max is a mature and balanced German Shepherd. Extremely intelligent and loyal with strong protective instincts. Has had advanced training and responds well to commands. Serious yet affectionate with his family. Needs an experienced owner familiar with the breed. Vigilant and attentive to his surroundings. Requires daily physical and mental exercise. Good with children in the family but may be reserved with strangers. A working dog who thrives when given a purpose.', 'Sibiu', '/images/max.jpg'),
(10, 'Lucy', 'Persian', 6, 'CAT', 'FEMALE', 'Lucy is an elegant and regal Persian cat. Has a dignified attitude and prefers being admired from afar. Selective with affection and prefers calm and gentle interactions. Suited for a quiet home without too much activity. Not very active and prefers relaxing in a cozy spot. Needs daily grooming to avoid matting. Independent but enjoys routine and familiarity. Doesn’t do well with noisy children or energetic animal companions.', 'București', '/images/lucy.jpg'),
(11, 'Rocky', 'Boxer', 4, 'DOG', 'MALE', 'Rocky is a strong and playful Boxer with endless energy. Extremely loyal and protective of his family. Very patient with kids and allows them a lot. Intelligent and trainable but gets bored easily and needs new challenges. Requires plenty of daily exercise and space to run. Friendly with most strangers but takes on a protector role when sensing threats. Robust dog who enjoys outdoor activities in any weather.', 'Galați', '/images/rocky.jpg'),
(12, 'Simba', 'Bengal', 3, 'CAT', 'MALE', 'Simba is a very active Bengal cat with high energy levels. Wild-looking and behaves just as wild – loves climbing, jumping, and exploring. Extremely intelligent and needs constant mental stimulation and interactive toys. Learns tricks and can be walked on a leash. Suitable for experienced owners who understand the needs of a hyper-intelligent cat. Not a typical lap cat but forms strong bonds with his family. Needs vertical space and exploration zones. Happiest in homes with safe outdoor access.', 'Timișoara', '/images/simba.jpg'),
(13, 'Daisy', 'Shih Tzu', 7, 'DOG', 'FEMALE', 'Daisy is a gentle and affectionate Shih Tzu who loves being around people. Loyal and devoted to her family, preferring to cuddle on the couch. Calm and well-suited to apartment living. Doesn’t need much exercise but enjoys short walks. Friendly with everyone, including kids and other pets. Needs regular grooming. Ideal for more sedentary families or elderly people. Sensitive to extreme temperatures and prefers indoor comfort.', 'Cluj', '/images/daisy.jpg'),
(14, 'Oscar', 'Domestic Shorthair', 1, 'CAT', 'MALE', 'Oscar is a young and energetic cat full of curiosity. Always on the move, exploring and playing. Has sudden bursts of energy, running around the house for no reason. Affectionate in his own way – stays close but rarely sits on laps. Independent but appreciates human company. Very playful and needs plenty of toys and activities. Gets along well with other young cats and kids who know how to treat animals. Needs a stimulating environment with lots of exploration spots.', 'Iași', '/images/oscar.jpg'),
(15, 'Zoe', 'Border Collie', 2, 'DOG', 'FEMALE', 'Zoe is an exceptionally intelligent Border Collie with unlimited energy. Needs constant mental challenges and intense daily physical exercise. Learns new commands incredibly fast and loves having tasks. Extremely loyal and forms strong bonds with her owner. Has herding instincts and may try to herd children or other animals. Best for active people who can provide training, mental work, and exercise. Not recommended for beginners or sedentary families. She is happiest when she has a job and works alongside her owner.', 'Constanța', '/images/zoe.jpg');

-- Products
INSERT INTO products (id, name, price, product_type, image_url) VALUES
(1, 'Cappuccino', 12.50, 'COFFEE', '/images/cappuccino.jpg'),
(2, 'Green Tea', 10.00, 'TEA', '/images/green-tea.jpg'),
(3, 'Chocolate Cake', 15.00, 'DESSERT', '/images/choco-cake.jpg');

-- Reservations
INSERT INTO reservations (id, user_id, reservation_datetime, duration_minutes, status) VALUES
(1, 3, '2025-05-20 14:00:00', 60, 'PENDING'),
(2, 3, '2025-05-21 16:00:00', 90, 'CONFIRMED');

-- Favorites
INSERT INTO favorites (user_id, animal_id) VALUES
(3, 1),
(3, 2);

-- Adoption Requests
INSERT INTO adoption_requests (id, user_id, animal_id, status, message) VALUES
(1, 3, 1, 'PENDING', 'Îmi doresc foarte mult să-l adopt pe Rex!'),
(4, 3, 2, 'CONFIRMED', 'Mi-ar plăcea să ofer o casă iubitoare pentru Luna.');