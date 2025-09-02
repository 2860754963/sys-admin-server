CREATE TABLE IF NOT EXISTS uploaded_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_type ENUM('image', 'video', 'file') NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT DEFAULT 0,
    upload_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT DEFAULT NULL,
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 可选：创建索引加速查询
CREATE INDEX idx_file_type ON uploaded_files(file_type);
CREATE INDEX idx_user_id ON uploaded_files(user_id);

-- 示例数据
INSERT INTO uploaded_files (file_name, file_type, file_path, file_size, user_id, description)
VALUES 
('example_image.jpg', 'image', 'images/example_image.jpg', 204800, 1, '示例图片'),
('example_video.mp4', 'video', 'videos/example_video.mp4', 10485760, 2, '示例视频'),
('example_doc.pdf', 'file', 'files/example_doc.pdf', 512000, 3, '示例文档');
