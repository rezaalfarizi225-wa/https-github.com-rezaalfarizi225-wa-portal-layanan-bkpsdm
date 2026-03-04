window.addEventListener('DOMContentLoaded', () => {
    // 1. Animasi untuk Hero Section (H1, P, dan Tombol)
    setTimeout(() => {
        document.querySelector('.hero h1').classList.add('appear');
    }, 200);
    
    setTimeout(() => {
        document.querySelector('.hero p').classList.add('appear');
    }, 400);

    setTimeout(() => {
        document.querySelector('.hero .btn-cta').classList.add('appear');
    }, 600);

    // 2. Animasi untuk Cards (Muncul satu per satu/Stagger)
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('appear');
        }, 800 + (index * 200)); 
    });

    // 3. Munculkan elemen lainnya saat scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.info h2, .steps-container, .faq-section').forEach(el => {
        observer.observe(el);
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const active = document.querySelector('.faq-question.active');
        if(active && active !== question ) {
            active.classList.toggle('active');
            active.nextElementSibling.style.maxHeight = 0;
        }
        question.classList.toggle('active');
        const answer = question.nextElementSibling;
        if(question.classList.contains('active')){
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = 0;
        }
    });
});

// Alur Detail Data
const alurData = {
    1: {
        title: "Langkah 1: Isi Form Online",
        desc: "Pilih jenis layanan (Magang, Pkl atau Penelitian) pada tombol di atas, lalu isi data diri dan data kampus dengan benar pada Google Form yang disediakan."
    },
    2: {
        title: "Langkah 2: Upload Dokumen",
        desc: "Siapkan file PDF scan Surat Pengantar dari Kampus/Sekolah, Sertakan Proposal Kegiatan Jika Tujuannya adalah Penelitian. Unggah pada bagian akhir formulir pendaftaran."
    },
    3: {
        title: "Langkah 3: Verifikasi Admin",
        desc: "Tim BKPSDM akan memeriksa kelengkapan berkas Anda dalam waktu 2-3 hari kerja. Pastikan nomor WhatsApp/Email aktif untuk menerima update."
    },
    4: {
        title: "Langkah 4: Notifikasi Selesai",
        desc: "Jika disetujui, Anda akan menerima Notifikasi Melalui Email, Dan Surat Balasan resmi dapat diambil langsung di kantor sesuai instruksi yang diberikan."
    }
};

function showDetail(stepId) {
    const modal = document.getElementById('alurModal');
    document.getElementById('modalTitle').innerText = alurData[stepId].title;
    document.getElementById('modalDescription').innerText = alurData[stepId].desc;
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('alurModal').style.display = "none";
}

// Menutup modal jika pengguna mengklik area di luar kotak putih
window.onclick = function(event) {
    const modal = document.getElementById('alurModal');
    if (event.target == modal) {
        closeModal();
    }
}