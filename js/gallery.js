document.addEventListener('DOMContentLoaded', () => {
    // Filter Gallery
    const filterButtons = document.querySelectorAll('.gallery-filter .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Fungsi untuk mengatur animasi dan transisi
    function setupGalleryAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        }, {
            threshold: 0.1 // Item akan tampil saat 10% masuk viewport
        });

        // Observer untuk setiap item gallery
        galleryItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Fungsi filter gallery
    function filterGallery(filter) {
        // Reset tampilan semua item
        galleryItems.forEach(item => {
            item.style.display = 'none'; // Sembunyikan semua item
            item.classList.remove('show');
        });

        // Filter dan tampilkan item sesuai kategori
        const filteredItems = filter === 'all' 
            ? galleryItems 
            : Array.from(galleryItems).filter(item => 
                item.getAttribute('data-category') === filter
            );

        // Tampilkan item yang sesuai dengan animasi
        filteredItems.forEach((item, index) => {
            // Tambahkan delay untuk efek animasi bertahap
            setTimeout(() => {
                item.style.display = 'block';
                item.classList.add('show');
            }, index * 100); // Delay bertahap antar item
        });
    }

    // Event listener untuk tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Hapus kelas active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Jalankan filter
            filterGallery(filter);
        });
    });

    // Inisialisasi animasi gallery
    setupGalleryAnimations();

    // Tambahan: Lightbox sederhana untuk gallery
    function setupLightbox() {
        const images = document.querySelectorAll('.gallery-card img');
        const lightbox = document.createElement('div');
        const lightboxImg = document.createElement('img');

        lightbox.style.display = 'none';
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.8)';
        lightbox.style.zIndex = '1000';
        lightbox.style.display = 'flex';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';

        lightboxImg.style.maxWidth = '90%';
        lightboxImg.style.maxHeight = '90%';
        lightboxImg.style.objectFit = 'contain';

        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        images.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = image.src;
                
                // Fade in
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                }, 10);
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            }
        });
    }

    // Inisialisasi lightbox
    setupLightbox();
});