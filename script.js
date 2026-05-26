document.addEventListener("DOMContentLoaded", () => {
    // === 1. XỬ LÝ GIAO DIỆN SÁNG TỐI ===
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        htmlElement.classList.remove('light');
    } else {
        htmlElement.classList.add('light');
        htmlElement.classList.remove('dark');
    }




    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                htmlElement.classList.add('light');
                localStorage.setItem('theme', 'light');
            } else {
                htmlElement.classList.remove('light');
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }


// 1. Khai báo biến toàn cục
let currentSlide = 0;
let slideInterval;


// 2. Hàm cập nhật Slider (Di chuyển ảnh và đổi màu chấm)
function updateSlider() {
    const slider = document.getElementById('banner-slider');
    const dots = document.querySelectorAll('.banner-dot');
   
    if (!slider) return;


    // Di chuyển slide
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;


    // Cập nhật màu chấm tròn (Chấm đang chọn thì trắng rõ, còn lại thì mờ)
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.remove('bg-white/50');
            dot.classList.add('bg-white');
        } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-white/50');
        }
    });
}


// 3. Hàm xử lý khi bấm vào chấm tròn (Quan trọng nhất)
window.goToSlide = function(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide(); // Bấm vào thì reset lại thời gian chờ để không bị nhảy slide ngay lập tức
};


// 4. Hàm tự động chạy
function startAutoSlide() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % 4;
        updateSlider();
    }, 3000); // 3 giây đổi một lần
}


function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}


// 5. Kích hoạt khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
    startAutoSlide();
});


// === SCROLL TỰ ĐỘNG ĐỔI MÀU CHỮ SÁNG LÊN VÀ ĐỔI ẢNH ĐIỆN THOẠI ===
const exerciseBlocks = document.querySelectorAll('.exercise-scroll-item');
const interactivePhone = document.getElementById('interactive-phone-screen');


if (exerciseBlocks.length > 0 && interactivePhone) {
   
    const updateExerciseLayoutByScroll = () => {
        // Cắt vạch kích hoạt chính xác tại vị trí 50% (giữa màn hình) giống hệt video mẫu
        const targetActivationLine = window.innerHeight * 0.50;
       
        let targetActiveIndex = 0;
        let minimumDistanceValue = 99999;


        // Tính khoảng cách xem phần nào đang nằm trúng vùng tâm màn hình nhất
        exerciseBlocks.forEach((block, index) => {
            const blockRect = block.getBoundingClientRect();
            const blockCenterY = blockRect.top + (blockRect.height * 0.5);
           
            const currentDistance = Math.abs(targetActivationLine - blockCenterY);
            if(currentDistance < minimumDistanceValue) {
                minimumDistanceValue = currentDistance;
                targetActiveIndex = index;
            }
        });


        // 1. ĐIỀU PHỐI HIỆU ỨNG CHỮ: Sáng bừng (opacity-100), đổi màu chữ mô tả và nhích sang phải (ml-6)
        exerciseBlocks.forEach((block, index) => {
            const h3Title = block.querySelector('h3');
            const pDescription = block.querySelector('p');


            if(index === targetActiveIndex) {
                // Khi active: Làm sáng chữ, đổi mô tả sang màu trắng tinh, tịnh tiến lề trái ra xa
                block.classList.remove('opacity-30', 'ml-0');
                block.classList.add('opacity-100', 'ml-0', 'lg:ml-6');
               
                if (pDescription) {
                    pDescription.classList.remove('text-zinc-400');
                    pDescription.classList.add('text-white', 'font-normal');
                }
            } else {
                // Khi không active: Trở về trạng thái mờ lờ mờ (opacity-30) và lùi lề về ban đầu
                block.classList.remove('opacity-100', 'ml-0', 'lg:ml-6');
                block.classList.add('opacity-30', 'ml-0');
               
                if (pDescription) {
                    pDescription.classList.remove('text-white', 'font-normal');
                    pDescription.classList.add('text-zinc-400');
                }
            }
        });


        // 2. ĐIỀU PHỐI ẢNH ĐIỆN THOẠI CHUẨN XÁC
        const currentlyActiveBlock = exerciseBlocks[targetActiveIndex];
        if (currentlyActiveBlock) {
            const imagePathToSwitch = currentlyActiveBlock.getAttribute('data-image');
           
            if (interactivePhone.getAttribute('src') !== imagePathToSwitch) {
                interactivePhone.style.opacity = '0.3';
               
                setTimeout(() => {
                    interactivePhone.src = imagePathToSwitch;
                    interactivePhone.style.opacity = '1';
                }, 120);
            }
        }
    };


    // Gắn sự kiện cuộn chuột thực tế
    window.addEventListener('scroll', updateExerciseLayoutByScroll);
    // Kích hoạt ngay lập tức lần đầu khi tải xong trang web
    updateExerciseLayoutByScroll();
}


    // === 2. XỬ LÝ GỬI EMAIL ĐĂNG KÝ (Đã cập nhật 2 URL) ===
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const submitBtn = document.getElementById('submit-btn');
































































    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailValue = emailInput.value.trim();
            if (!emailValue) return;
































































            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Đang xử lý...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
































































            // Cấu hình 2 đường link
            const saveSheetURL = 'https://script.google.com/macros/s/AKfycbyNDnaqZazoe462WLfKU2Awejx13xgSLzrEo5q2cti3DyzSAIHnR9anX3qAfxlTwmmUZg/exec';
            const sendMailURL = 'https://script.google.com/macros/s/AKfycbx0bS56EjyzHCUB35vnYBFuc6HC0cvY09w7lV1RK7Z7iAlPszpqejw90LgR2M6vvzUu5w/exec';
































































            const formData = new FormData();
            formData.append('email', emailValue);
































































            // Gửi dữ liệu tới 2 link cùng lúc
            Promise.all([
                fetch(saveSheetURL, { method: 'POST', body: formData }),
                fetch(sendMailURL, { method: 'POST', body: formData })
            ])
            .then(responses => {
                const allSuccess = responses.every(res => res.ok);
                if (allSuccess) {
                    alert('Đăng ký trải nghiệm thành công! Vui lòng kiểm tra email của bạn.');
                    emailForm.reset();
                } else {
                    alert('Đã ghi nhận đăng ký nhưng có thể có độ trễ khi gửi email xác nhận. Xin cảm ơn!');
                    emailForm.reset();
                }
            })
            .catch(error => {
                console.error('Lỗi khi xử lý dữ liệu:', error);
                alert('Có lỗi xảy ra kết nối mạng, vui lòng thử lại sau.');
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            });
        });
    }
































































    // === 3. XỬ LÝ MENU BÀI TẬP & NÚT BACK TRÌNH DUYỆT ===
    const navBaitapBtn = document.getElementById('nav-baitap');
    const dropdownBaitap = document.getElementById('dropdown-baitap');
    const navLogo = document.getElementById('nav-logo');
    const mainLandingPage = document.querySelector('main');
    const exerciseLibrarySection = document.getElementById('exercise-library-section');
    const libraryTitle = document.getElementById('library-title');
    const categoryLinks = document.querySelectorAll('.category-link');
   
    const libraryFiltersContainer = document.getElementById('library-filters');
    const libraryGridContainer = document.getElementById('library-grid');
    const libraryDesc = document.getElementById('library-desc');
































































    const arrowIcon = navBaitapBtn ? navBaitapBtn.querySelector('svg') : null;
































































    if (navBaitapBtn && dropdownBaitap && arrowIcon) {
        navBaitapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = dropdownBaitap.classList.contains('hidden');
            if (isHidden) {
                dropdownBaitap.classList.remove('hidden');
                setTimeout(() => dropdownBaitap.classList.remove('opacity-0'), 10);
                arrowIcon.classList.add('rotate-180');
            } else {
                dropdownBaitap.classList.add('opacity-0');
                arrowIcon.classList.remove('rotate-180');
                setTimeout(() => dropdownBaitap.classList.add('hidden'), 200);
            }
        });
































































        document.addEventListener('click', (e) => {
            if (!navBaitapBtn.contains(e.target) && !dropdownBaitap.contains(e.target)) {
                dropdownBaitap.classList.add('opacity-0');
                arrowIcon.classList.remove('rotate-180');
                setTimeout(() => dropdownBaitap.classList.add('hidden'), 200);
            }
        });
    }
































































  const showLibraryView = (categoryName) => {
        if (exerciseLibrarySection && mainLandingPage) {
            // ĐỔI GẠCH CHÂN SANG BÀI TẬP
            const navHome = document.getElementById('nav-menu-home');
            if (navHome) navHome.classList.remove('nav-active');
            if (navBaitapBtn) navBaitapBtn.classList.add('nav-active');
        if (categoryName && libraryTitle) libraryTitle.innerText = `Thư viện bài tập: ${categoryName}`;
       
        if (categoryName === 'Workout') {
            renderWorkoutCategory();
        } else if (categoryName === 'Yoga') {
            renderYogaCategory();
        } else if (categoryName === 'Pilates') {
            renderPilatesCategory();
            } else if (categoryName === 'Boxing') {
            renderBoxingCategory(); // Tích hợp Boxing vào danh mục
        } else {
            if (libraryFiltersContainer) libraryFiltersContainer.innerHTML = '';
            if (libraryGridContainer) libraryGridContainer.innerHTML = `<p class="col-span-full text-center text-text-secondary py-10">Mục ${categoryName} đang được cập nhật dữ liệu...</p>`;
            if (libraryDesc) libraryDesc.innerText = "Dữ liệu đang được bổ sung bởi các chuyên gia.";
        }
































































            mainLandingPage.classList.add('hidden');
            exerciseLibrarySection.classList.remove('hidden');
           
            if (dropdownBaitap && arrowIcon) {
                dropdownBaitap.classList.add('opacity-0');
                arrowIcon.classList.remove('rotate-180');
                setTimeout(() => dropdownBaitap.classList.add('hidden'), 200);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
































































const showHomeView = () => {
        if (exerciseLibrarySection && mainLandingPage) {
            // ĐỔI GẠCH CHÂN VỀ TRANG CHỦ
            const navHome = document.getElementById('nav-menu-home');
            if (navBaitapBtn) navBaitapBtn.classList.remove('nav-active');
            if (navHome) navHome.classList.add('nav-active');








            exerciseLibrarySection.classList.add('hidden');
            mainLandingPage.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
































































    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoryName = e.target.innerText;
            history.pushState({ view: 'library', category: categoryName }, "", "#thuvien");
            showLibraryView(categoryName);
        });
    });
































































    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.view === 'library') {
            showLibraryView(event.state.category);
        } else {
            showHomeView();
        }
    });
































































    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState({ view: 'home' }, "", window.location.pathname);
            showHomeView();
        });
    }
































































    const backToHomeBtn = document.getElementById('back-to-home-btn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState({ view: 'home' }, "", window.location.pathname);
            showHomeView();
        });
    }
































































    // === HÀM RENDER GRID DÙNG CHUNG CHO CẢ WORKOUT & YOGA ===
    const renderGrid = (data) => {
        if (!libraryGridContainer) return;
       
        let gridHTML = '';
        if (data.length === 0) {
            gridHTML = `<p class="col-span-full text-center text-text-secondary py-10">Chưa có bài tập nào trong mục này.</p>`;
        } else {
            data.forEach((item) => {
                gridHTML += `
                <div class="bg-bg-primary rounded-2xl overflow-hidden border border-bg-tertiary hover:border-main-red hover:shadow-lg hover:shadow-main-red/10 transition-all duration-300 group cursor-pointer">
                    <div class="h-40 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                        <span class="text-gray-400 dark:text-gray-600 font-medium text-sm">Hình minh hoạ bài tập</span>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                            <div class="w-10 h-10 rounded-full bg-main-red flex items-center justify-center shadow-lg">
                                <svg class="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div class="p-5">
                        <span class="text-[10px] font-bold text-main-red uppercase tracking-wider mb-2 block">${item.label}</span>
                        <h3 class="text-base font-bold text-text-primary line-clamp-2">${item.name}</h3>
                    </div>
                </div>`;
            });
        }
        libraryGridContainer.innerHTML = gridHTML;
    };
































































    // === 4. KHO DỮ LIỆU & TÍNH NĂNG LỌC CHO "WORKOUT" ===
    const workoutDatabase = [
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Push-up: Hít đất cơ bản' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Wide Grip Push-up: Hít đất tay rộng' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Diamond Push-up: Hít đất kim cương' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Incline Push-up: Hít đất dốc lên' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Decline Push-up: Hít đất dốc xuống' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Plyometric Push-up: Hít đất bật vỗ tay' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Spiderman Push-up: Hít đất kiểu người nhện' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Archer Push-up: Hít đất kiểu cung thủ' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Staggered Push-up: Hít đất tay trước tay sau' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Hindu Push-up: Hít đất uốn lượn kiểu Hindu' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Dive Bomber Push-up: Hít đất chui rào' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Pseudo Planche Push-up: Hít đất chồm người tới trước' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'One-arm Push-up: Hít đất một tay' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Kneeling Push-up: Hít đất quỳ gối' },
        { filter: 'nguc', label: 'Cơ Ngực', name: 'Isometric Chest Squeeze: Ép lòng bàn tay' },
































































        { filter: 'lung', label: 'Cơ Lưng', name: 'Superman: Nằm sấp nâng tay và chân' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Superman Pull: Nằm sấp kéo cùi chỏ ra sau' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Reverse Snow Angel: Thiên thần tuyết ngược' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Prone T-Raise: Nằm sấp dang tay chữ T' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Prone Y-Raise: Nằm sấp vươn tay chữ Y' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Prone W-Raise: Nằm sấp co cùi chỏ chữ W' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Bird-Dog: Quỳ chống tay duỗi tay chân chéo' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Plank with Row: Plank rút cùi chỏ lên cao' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Aquaman: Nằm sấp bơi trên cạn' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Back Extension: Gập lưng dưới trên mặt đất' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Wall Slides: Dựa tường trượt tay lên xuống' },
        { filter: 'lung', label: 'Cơ Lưng', name: 'Reverse Plank: Plank ngược' },
































































        { filter: 'vai', label: 'Cơ Vai', name: 'Pike Push-up: Hít đất gập góc (chữ V ngược)' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Elevated Pike Push-up: Hít đất gập góc kê chân cao' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Handstand Wall Walk: Bò lùi lên tường' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Arm Circles: Dang tay xoay tròn' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Crab Walk: Đi bộ kiểu cua' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Plank to Downward Dog: Plank sang chó cúi mặt' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Shoulder Taps: Plank chạm vai đối diện' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Lateral Plank Walk: Plank bò ngang' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Bear Crawl: Bò kiểu gấu' },
        { filter: 'vai', label: 'Cơ Vai', name: 'Dolphin Plank: Plank tì khuỷu tay đẩy mông' },
































































        { filter: 'tay', label: 'Cơ Tay', name: 'Bench Dip: Nhún tay sau trên ghế' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Floor Dip: Nhún tay sau trên sàn' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Tricep Extension Push-up: Hít đất duỗi khuỷu tay' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Towel Bicep Curl: Gập tay trước với khăn' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Doorway Bicep Curl: Bám khung cửa kéo' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Isometric Bicep Curl: Gồng tay trước tĩnh' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Tricep Bow: Đứng cúi người duỗi tay sau' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Sphinx Push-up: Hít đất nhân sư' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Reverse Push-up: Hít đất ngược' },
        { filter: 'tay', label: 'Cơ Tay', name: 'Commandos: Plank lên xuống bàn tay/khuỷu tay' },
































































        { filter: 'bung', label: 'Cơ Bụng', name: 'Crunch: Gập bụng cơ bản' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Reverse Crunch: Gập bụng ngược' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Bicycle Crunch: Gập bụng đạp xe' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'V-up: Gập bụng chữ V' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Russian Twist: Vặn mình kiểu Nga' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Plank: Plank thấp' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Side Plank: Plank nghiêng' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Hollow Body Hold: Giữ tư thế thuyền' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Dead Bug: Tư thế con bọ chết' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Lying Leg Raise: Nằm ngửa nâng 2 chân' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Flutter Kicks: Nằm ngửa đá chân vẩy' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Scissor Kicks: Nằm ngửa đá chân đan chéo' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Heel Touches: Nằm ngửa chạm gót chân' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Toe Touches: Giơ thẳng chân chạm mũi' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Mountain Climber: Leo núi tại chỗ' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Cross-body Mountain Climber: Leo núi chéo gối' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Plank Jacks: Plank bật nhảy tách chân' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Sit-up: Ngồi dậy toàn phần' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Tuck Crunch: Gập bụng co gối sát ngực' },
        { filter: 'bung', label: 'Cơ Bụng', name: 'Star Plank: Plank ngôi sao' },
































































        { filter: 'chan', label: 'Chân & Mông', name: 'Squat: Ngồi xổm cơ bản' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Jump Squat: Squat bật nhảy' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Sumo Squat: Squat mở rộng chân' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Pistol Squat: Squat một chân' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Bulgarian Split Squat: Squat tách chân kê ghế' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Forward Lunge: Bước chùng chân tới trước' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Reverse Lunge: Bước chùng chân lùi' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Walking Lunge: Đi bộ chùng chân' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Side Lunge: Bước chùng chân sang ngang' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Curtsy Lunge: Bước chùng chân chéo' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Glute Bridge: Bắc cầu cơ mông' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Single-leg Glute Bridge: Đẩy hông 1 chân' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Donkey Kicks: Đá gót chân lên trời' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Fire Hydrant: Nâng đùi sang ngang' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Calf Raise: Nhón gót chân' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Wall Sit: Ngồi dựa tường tĩnh' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Frog Pump: Nằm ép lòng bàn chân đẩy hông' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Step-up: Bước lên bục/ghế' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Cossack Squat: Squat dồn trọng tâm sang 1 bên' },
        { filter: 'chan', label: 'Chân & Mông', name: 'Lunge Jumps: Chùng chân bật nhảy đổi bên' },
































































        { filter: 'toanthan', label: 'Toàn Thân', name: 'Burpee: Hít đất và bật nhảy' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Half Burpee: Burpee không hít đất' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Jumping Jacks: Bật nhảy dang tay vỗ' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'High Knees: Chạy nâng cao đùi' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Butt Kicks: Chạy gót chạm mông' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Skaters: Nhảy trượt băng chéo chân' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Inchworm: Sâu đo tới trước lùi lại' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Broad Jump: Bật nhảy xa tới trước' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Tuck Jump: Bật nhảy co gối' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Fast Feet: Chạy lúp xúp nhón gót tốc độ cao' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Shadow Boxing: Chạy bước nhỏ đấm gió' },
        { filter: 'toanthan', label: 'Toàn Thân', name: 'Seal Jacks: Bật nhảy vỗ tay ngang' }
    ];
































































    const workoutFilters = [
        { id: 'all', name: 'Tất cả' },
        { id: 'nguc', name: 'Cơ Ngực' },
        { id: 'lung', name: 'Cơ Lưng' },
        { id: 'vai', name: 'Cơ Vai' },
        { id: 'tay', name: 'Cơ Tay' },
        { id: 'bung', name: 'Cơ Bụng' },
        { id: 'chan', name: 'Chân & Mông' },
        { id: 'toanthan', name: 'Toàn thân' }
    ];
































































    const renderWorkoutCategory = () => {
        if (!libraryFiltersContainer || !libraryGridContainer || !libraryDesc) return;
       
        let filterHTML = `<div class="flex gap-3 w-full overflow-x-auto hide-scrollbar pb-2 lg:pb-0">`;
        workoutFilters.forEach(f => {
            const activeClasses = f.id === 'all'
                ? 'bg-main-red text-white'
                : 'bg-white dark:bg-[#121214] text-text-secondary hover:text-text-primary border-gray-300 dark:border-gray-800 hover:border-main-red';
           
            filterHTML += `<button onclick="filterWorkouts('${f.id}')" id="btn-filter-${f.id}" class="filter-btn shrink-0 px-6 py-3.5 font-bold rounded-xl text-sm tracking-wider uppercase border transition-colors ${activeClasses}">${f.name}</button>`;
        });
        filterHTML += `</div>`;
        libraryFiltersContainer.innerHTML = filterHTML;
































































        renderGrid(workoutDatabase);
        libraryDesc.innerText = `Thư viện Bodyweight khổng lồ với ${workoutDatabase.length} bài tập không cần tạ.`;
    };
































































    window.filterWorkouts = (filterId) => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('bg-main-red', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
        });
       
        const activeBtn = document.getElementById(`btn-filter-${filterId}`);
        if(activeBtn) {
            activeBtn.classList.remove('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
            activeBtn.classList.add('bg-main-red', 'text-white');
        }
































































        if (filterId === 'all') {
            renderGrid(workoutDatabase);
        } else {
            const filteredData = workoutDatabase.filter(item => item.filter === filterId);
            renderGrid(filteredData);
        }
    };
































































    // === 5. KHO DỮ LIỆU & TÍNH NĂNG LỌC CHO "YOGA" ===
    const yogaDatabase = [
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế ngọn núi (Tadasana / Mountain Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế cái cây (Vrksasana / Tree Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế tam giác (Trikonasana / Triangle Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế ngồi gập người (Paschimottanasana / Seated Forward Bend)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế rắn hổ mang (Bhujangasana / Cobra Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế xác chết (Savasana / Corpse Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế mèo - bò (Marjaryasana-Bitilasana / Cat-Cow Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế chó úp mặt (Adho Mukha Svanasana / Downward-Facing Dog)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế cây cầu (Setu Bandhasana / Bridge Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế ngồi vặn mình (Ardha Matsyendrasana / Half Lord of the Fishes Pose)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế chiến binh 1 (Virabhadrasana I / Warrior I)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế chiến binh 2 (Virabhadrasana II / Warrior II)' },
        { filter: 'hatha', label: 'Hatha Yoga', name: 'Tư thế em bé (Balasana / Child\'s Pose)' },
































































        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Chuỗi chào mặt trời A (Surya Namaskar A / Sun Salutation A)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế tấm ván (Phalakasana / Plank Pose)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế chống đẩy thấp (Chaturanga Dandasana / Four-Limbed Staff Pose)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế chó ngẩng mặt (Urdhva Mukha Svanasana / Upward-Facing Dog)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế chó úp mặt 3 chân (Eka Pada Adho Mukha Svanasana / Three-Legged Dog)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế trăng lưỡi liềm cao (Ashta Chandrasana / High Lunge)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế trăng lưỡi liềm thấp (Anjaneyasana / Low Lunge)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế cái ghế (Utkatasana / Chair Pose)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế đứng gập người (Uttanasana / Standing Forward Bend)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế đứng gập nửa người (Ardha Uttanasana / Halfway Look Up)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế chiến binh đảo ngược (Viparita Virabhadrasana / Reverse Warrior)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế góc nghiêng mở rộng (Utthita Parsvakonasana / Extended Side Angle Pose)' },
        { filter: 'vinyasa', label: 'Vinyasa Yoga', name: 'Tư thế hoang dã (Camatkarasana / Wild Thing)' },
































































        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế đứng nắm ngón chân cái (Padangusthasana / Big Toe Pose)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế luồn tay dưới chân (Padahastasana / Hands Under Feet Pose)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế tam giác vặn mình (Parivrtta Trikonasana / Revolved Triangle Pose)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế đứng dang chân gập người A (Prasarita Padottanasana A)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế kim tự tháp (Parsvottanasana / Pyramid Pose)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế giơ chân nắm ngón cái (Utthita Hasta Padangusthasana)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế bán hoa sen đứng gập người (Ardha Baddha Padmottanasana)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế gập người kéo giãn lưng (Paschimottanasana A, B, C)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế tấm ván ngửa (Purvottanasana / Upward Plank Pose)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế ngồi đầu chạm gối (Janu Sirsasana A / Head-to-Knee Forward Bend)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế vặn mình Marichi A (Marichyasana A)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế con thuyền (Navasana / Boat Pose)' },
        { filter: 'ashtanga', label: 'Ashtanga Yoga', name: 'Tư thế hoa sen (Padmasana / Lotus Pose)' },
































































        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế cây cầu có gạch hỗ trợ (Supported Bridge Pose)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế góc cố định nằm ngửa với gối (Supta Baddha Konasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế đứng đầu có tường hỗ trợ (Salamba Sirsasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế đứng vai với chăn lót (Salamba Sarvangasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế nửa vầng trăng dùng gạch (Ardha Chandrasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế nằm kéo ngón chân cái với dây đai (Supta Padangusthasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế con cá dùng gạch kê lưng (Supported Matsyasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế em bé ôm gối bolster (Supported Child\'s Pose)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế chó úp mặt với dây treo tường (Wall Ropes Downward Dog)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế gác chân lên tường (Viparita Karani)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế anh hùng ngồi trên gạch (Virasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế góc cố định ngồi trên chăn gấp (Baddha Konasana)' },
        { filter: 'iyengar', label: 'Iyengar Yoga', name: 'Tư thế nửa cái cày với ghế hỗ trợ (Supported Half Halasana)' },
































































        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế con bướm gập người (Butterfly Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế nhân sư (Sphinx Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế hải cẩu (Seal Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế con rồng (Dragon Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế thiên nga (Swan Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế thiên nga ngủ (Sleeping Swan)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế sâu bướm (Caterpillar Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế dây giày (Shoelace Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế hình vuông / Bồ câu kép (Square Pose / Double Pigeon)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế con ốc sên (Snail Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế con ếch (Frog Pose)' },
        { filter: 'yin', label: 'Yin Yoga', name: 'Tư thế quả chuối (Bananasana)' },
































































        { filter: 'hot', label: 'Hot Yoga', name: 'Bài tập hít thở sâu (Pranayama / Deep Breathing)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế cái ghế đứng mũi chân (Awkward Pose)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế đại bàng (Garudasana / Eagle Pose)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế đứng đầu chạm gối (Dandayamana Janushirasana)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế đứng kéo cung (Dandayamana Dhanurasana)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế cái gậy cân bằng (Tuladandasana / Balancing Stick Pose)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế đứng dang chân gập người (Dandayamana Bibhaktapada Paschimotanasana)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế đứng bằng mũi chân (Padangustasana / Toe Stand Pose)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế con lạc đà (Ustrasana / Camel Pose)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế con thỏ (Sasangasana / Rabbit Pose)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Tư thế xoắn cột sống (Ardha Matsyendrasana / Spine Twisting Pose)' },
        { filter: 'hot', label: 'Hot Yoga', name: 'Bài tập thở lửa thanh lọc (Kapalbhati in Vajrasana)' },
































































        { filter: 'power', label: 'Power Yoga', name: 'Tư thế con quạ (Bakasana / Crow Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế tám góc (Astavakrasana / Eight-Angle Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế con quạ nghiêng (Parsva Bakasana / Side Crow Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế cá heo (Ardha Pincha Mayurasana / Dolphin Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế chuối cẳng tay (Pincha Mayurasana / Forearm Stand)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế con đom đóm (Tittibhasana / Firefly Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế bánh xe (Urdhva Dhanurasana / Wheel Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế tấm ván nghiêng (Vasisthasana / Side Plank)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế tam giác ngã (Fallen Triangle Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế chiến binh 3 (Virabhadrasana III / Warrior III)' },
        { filter: 'power', label: 'Power Yoga', name: 'Tư thế bồ câu bay (Eka Pada Galavasana / Flying Pigeon Pose)' },
        { filter: 'power', label: 'Power Yoga', name: 'Nhảy lùi qua chaturanga (Jump back to Chaturanga)' },
































































        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế ngồi thoải mái (Sukhasana / Easy Pose)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Bài tập xoay cổ và vai thư giãn (Neck and Shoulder Rolls)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế ngồi nghiêng lườn (Seated Side Stretch)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế nằm ôm gối sát ngực (Apanasana / Knee-to-Chest Pose)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế nằm ngửa vặn mình (Supta Matsyendrasana / Supine Spinal Twist)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế em bé hạnh phúc (Ananda Balasana / Happy Baby Pose)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế chó con duỗi mình (Uttana Shishosana / Puppy Pose)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế đứng nghiêng người nhẹ nhàng (Standing Side Bend)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế con mèo - con bò biên độ nhỏ (Gentle Cat-Cow)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế thư giãn Savasana kê gối (Supported Corpse Pose)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế nằm ngửa hình góc cố định (Reclining Bound Angle Pose)' },
        { filter: 'gentle', label: 'Gentle Yoga', name: 'Tư thế nghỉ ngơi kiến tạo (Constructive Rest)' }
    ];
































































    const yogaFilters = [
        { id: 'all', name: 'Tất cả' },
        { id: 'hatha', name: 'Hatha Yoga' },
        { id: 'vinyasa', name: 'Vinyasa Yoga' },
        { id: 'ashtanga', name: 'Ashtanga Yoga' },
        { id: 'iyengar', name: 'Iyengar Yoga' },
        { id: 'yin', name: 'Yin Yoga' },
        { id: 'hot', name: 'Hot Yoga' },
        { id: 'power', name: 'Power Yoga' },
        { id: 'gentle', name: 'Gentle Yoga' }
    ];
































































    const renderYogaCategory = () => {
        if (!libraryFiltersContainer || !libraryGridContainer || !libraryDesc) return;
       
        let filterHTML = `<div class="flex gap-3 w-full overflow-x-auto hide-scrollbar pb-2 lg:pb-0">`;
        yogaFilters.forEach(f => {
            const activeClasses = f.id === 'all'
                ? 'bg-main-red text-white'
                : 'bg-white dark:bg-[#121214] text-text-secondary hover:text-text-primary border-gray-300 dark:border-gray-800 hover:border-main-red';
           
            filterHTML += `<button onclick="filterYoga('${f.id}')" id="btn-filter-yoga-${f.id}" class="filter-btn-yoga shrink-0 px-6 py-3.5 font-bold rounded-xl text-sm tracking-wider uppercase border transition-colors ${activeClasses}">${f.name}</button>`;
        });
        filterHTML += `</div>`;
        libraryFiltersContainer.innerHTML = filterHTML;
































































        renderGrid(yogaDatabase);
        libraryDesc.innerHTML = `Hành trình kết nối thân - tâm - trí với ${yogaDatabase.length} tư thế Yoga đa dạng từ cơ bản đến nâng cao.`;
    };
































































    window.filterYoga = (filterId) => {
        document.querySelectorAll('.filter-btn-yoga').forEach(btn => {
            btn.classList.remove('bg-main-red', 'text-white');
            btn.classList.add('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
        });
       
        const activeBtn = document.getElementById(`btn-filter-yoga-${filterId}`);
        if(activeBtn) {
            activeBtn.classList.remove('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
            activeBtn.classList.add('bg-main-red', 'text-white');
        }






        if (filterId === 'all') {
            renderGrid(yogaDatabase);
        } else {
            const filteredData = yogaDatabase.filter(item => item.filter === filterId);
            renderGrid(filteredData);
        }
    };
































    const pilatesDatabase = [
    // 1. Pilates Cổ điển (15 bài)
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Bài tập trăm nhịp (The Hundred)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Cuộn người lên (Roll Up)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Vẽ vòng chân đơn (Single Leg Circle)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Lăn như quả bóng (Rolling Like a Ball)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Kéo căng một chân (Single Leg Stretch)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Kéo căng hai chân (Double Leg Stretch)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Căng cột sống về trước (Spine Stretch Forward)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Bập bênh hai chân (Open Leg Rocker)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Xoay thân mình (Corkscrew)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Động tác cái cưa (The Saw)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Lặn thiên nga (Swan Dive)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Đá một chân (Single Leg Kick)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Đá hai chân (Double Leg Kick)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Kéo cổ (Neck Pull)' },
    { filter: 'co-dien', label: 'Pilates Cổ điển', name: 'Động tác Boomerang (The Boomerang)' },
































    // 2. Pilates Nâng cao (15 bài)
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Động tác chéo chân (Criss Cross)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Động tác chữ V (Teaser)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Vẽ vòng hông (Hip Circles)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Động tác bơi lội (Swimming)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Kéo căng phía trước (Leg Pull Front)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Kéo căng phía sau (Leg Pull Back)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Đá chân trước sau (Side Kick - Front and Back)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Đá chân lên xuống (Side Kick - Up and Down)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Xoay tròn chân (Side Kick - Small Circles)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Động tác đạp xe (Side Kick - Bicycle)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Uốn cong người bên (Side Bend)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Chuẩn bị Boomerang (Boomerang Prep)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Động tác con cua (The Crab)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Kiểm soát cân bằng (Control Balance)' },
    { filter: 'nang-cao', label: 'Pilates Nâng cao', name: 'Hít đất kiểu Pilates (Pilates Push Up)' },
































    // 3. Reformer Pilates (15 bài)
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Đạp chân cơ bản - Song song (Footwork - Parallel)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Đạp chân chữ V (Footwork - V-Position)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Đạp chân bằng gót (Footwork - Heels)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Trăm nhịp trên máy (Hundred on the Reformer)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Cuộn sống lưng ngắn (Short Spine Massage)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Cuộn sống lưng dài (Long Spine Massage)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Chân trong dây - Động tác ếch (Feet in Straps - Frog)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Chân trong dây - Xoay tròn (Feet in Straps - Circles)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Massage bụng - Cuộn tròn (Stomach Massage - Round)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Massage bụng - Tay sau lưng (Stomach Massage - Hands Back)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Chèo thuyền - Mặt hướng trước (Rowing - Facing Front)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Chèo thuyền - Mặt hướng sau (Rowing - Facing Back)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Kéo dây đeo (Pull Straps)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Kéo căng dài (Long Stretch)' },
    { filter: 'reformer', label: 'Reformer Pilates', name: 'Kéo căng xuống (Down Stretch)' },
































    // 4. Pilates với Bóng (Stability Ball) (15 bài)
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Bắc cầu với bóng (Ball Bridge)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Gập bụng với bóng (Ball Crunch)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Tấm ván trên bóng (Ball Plank)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Lăn bóng tay (Ball Rollout)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Ngồi xổm dựa tường với bóng (Ball Wall Squat)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Gập gối với bóng (Ball Hamstring Curl)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Hít đất với bóng (Ball Push Up)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Chuyền bóng (Ball Pass)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Động tác chữ V với bóng (Ball Pike)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Động tác Teaser với bóng (Ball Teaser)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Đá kéo với bóng (Ball Scissors)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Xoay thân mình với bóng (Ball Oblique Twist)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Mở rộng lưng với bóng (Ball Back Extension)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Co gối với bóng (Ball Knee Tuck)' },
    { filter: 'bong', label: 'Pilates với Bóng', name: 'Động tác Thiên nga với bóng (Ball Swan)' },
































    // 5. Pilates với Vòng (Magic Circle) (14 bài)
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Ép vòng đùi trong (Circle Squeeze - Inner Thigh)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Ép vòng đùi ngoài (Circle Squeeze - Outer Thigh)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Gập bụng với vòng (Circle Crunch)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Bắc cầu với vòng (Circle Bridge)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Tạo hình chữ V với vòng (Circle Teaser)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Ép tay với vòng (Circle Arm Press)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Kéo căng một chân với vòng (Circle Single Leg Stretch)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Kéo căng hai chân với vòng (Circle Double Leg Stretch)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Cuộn người với vòng (Circle Roll Down)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Nâng chân bên với vòng (Circle Side Leg Lift)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Ép nghiêng với vòng (Circle Oblique Press)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Mở rộng ngực với vòng (Circle Chest Expansion)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Tư thế thiên nga với vòng (Circle Swan)' },
    { filter: 'vong', label: 'Pilates với Vòng', name: 'Trăm nhịp với vòng (Circle Hundreds)' },
































    // 6. Pilates với Dây kháng lực (Resistance Band) (14 bài)
    { filter: 'day', label: 'Pilates với Dây', name: 'Kéo dây lưng (Band Row)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Đẩy ngực với dây (Band Chest Press)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Kéo tay với dây (Band Arm Pull)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Trăm nhịp với dây (Band Hundred)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Cuộn người với dây (Band Roll Down)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Kéo căng một chân với dây (Band Single Leg Stretch)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Kéo căng hai chân với dây (Band Double Leg Stretch)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Tạo hình chữ V với dây (Band Teaser)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Vòng chân với dây (Band Leg Circles)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Nâng chân bên với dây (Band Side Leg Lift)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Xoay cột sống với dây (Band Spine Twist)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Bắc cầu với dây (Band Bridging)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Tư thế thiên nga với dây (Band Swan)' },
    { filter: 'day', label: 'Pilates với Dây', name: 'Hít đất với dây (Band Push Up)' },
































    // 7. Pilates Phục hồi & Giãn cơ (12 bài)
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Kéo giãn nàng tiên cá (Mermaid Stretch)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Mèo - Bò theo nhịp thở (Cat Cow in Pilates breathing)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Cuộn xương chậu (Pelvic Curls)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Xoay cột sống nằm (Spine Twist Supine)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Hạ gối (Knee Drops)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Tư thế vỏ sò giãn cơ (Shell Stretch)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Xoay cột sống ngực (Thoracic Rotation)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Luồn kim kiểu Pilates (Thread the Needle Pilates)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Mở rộng ngực thư giãn (Chest Opener)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Tư thế nghỉ ngơi (Rest Position)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Tư thế vỏ sò (Side Lying Clam)' },
    { filter: 'phuc-hoi', label: 'Phục hồi & Giãn cơ', name: 'Nâng chân nằm nghiêng (Side Lying Leg Lift)' }
];
































const pilatesFilters = [
    { id: 'all', name: 'Tất cả' },
    { id: 'co-dien', name: 'Pilates Cổ điển' },
    { id: 'nang-cao', name: 'Pilates Nâng cao' },
    { id: 'reformer', name: 'Reformer Pilates' },
    { id: 'bong', name: 'Pilates với Bóng' },
    { id: 'vong', name: 'Pilates với Vòng' },
    { id: 'day', name: 'Pilates với Dây' },
    { id: 'phuc-hoi', name: 'Phục hồi & Giãn cơ' }
];
































const renderPilatesCategory = () => {
    if (!libraryFiltersContainer || !libraryGridContainer || !libraryDesc) return;
   
    let filterHTML = `<div class="flex gap-3 w-full overflow-x-auto hide-scrollbar pb-2 lg:pb-0">`;
    pilatesFilters.forEach(f => {
        const activeClasses = f.id === 'all'
            ? 'bg-main-red text-white'
            : 'bg-white dark:bg-[#121214] text-text-secondary hover:text-text-primary border-gray-300 dark:border-gray-800 hover:border-main-red';
       
        filterHTML += `<button onclick="filterPilates('${f.id}')" id="btn-filter-${f.id}" class="filter-btn shrink-0 px-6 py-3.5 font-bold rounded-xl text-sm tracking-wider uppercase border transition-colors ${activeClasses}">${f.name}</button>`;
    });
    filterHTML += `</div>`;
    libraryFiltersContainer.innerHTML = filterHTML;
































    renderGrid(pilatesDatabase); // Sử dụng lại hàm renderGrid của mục Workout
    libraryDesc.innerText = `Thư viện Pilates đa dạng với ${pilatesDatabase.length} bài tập từ cơ bản đến nâng cao.`;
};
































// Hàm đính kèm vào window để gọi từ HTML
window.filterPilates = (filterId) => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-main-red', 'text-white');
        btn.classList.add('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
    });
   
    const activeBtn = document.getElementById(`btn-filter-${filterId}`);
    if(activeBtn) {
        activeBtn.classList.remove('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
        activeBtn.classList.add('bg-main-red', 'text-white');
    }




    if (filterId === 'all') {
        renderGrid(pilatesDatabase);
    } else {
        const filteredData = pilatesDatabase.filter(item => item.filter === filterId);
        renderGrid(filteredData);
    }
};




// 1. Cơ sở dữ liệu đòn đấm Boxing
// Thay thế đoạn boxingDatabase cũ bằng đoạn này:
const boxingDatabase = [
    { id: 1, name: "Đấm thẳng trái", filter: "straight", category: "Boxing", muscleGroup: "Vai, Tay trước", difficulty: "Dễ" },
    { id: 2, name: "Đấm thẳng phải", filter: "straight", category: "Boxing", muscleGroup: "Lưng, Hông, Tay sau", difficulty: "Trung bình" },
    { id: 3, name: "Đòn Swing trái", filter: "hook", category: "Boxing", muscleGroup: "Eo, Lườn", difficulty: "Khó" },
    { id: 4, name: "Đòn Swing phải", filter: "hook", category: "Boxing", muscleGroup: "Eo, Hông", difficulty: "Khó" },
    { id: 5, name: "Đòn Xúc trái", filter: "uppercut", category: "Boxing", muscleGroup: "Cơ bụng, Bắp tay", difficulty: "Trung bình" },
    { id: 6, name: "Đòn Xúc phải", filter: "uppercut", category: "Boxing", muscleGroup: "Toàn thân, Cơ lõi", difficulty: "Trung bình" }
];




// 2. Mảng chứa các bộ lọc (Filter) của Boxing
const boxingFilters = [
    { id: 'all', name: 'Tất cả' },
    { id: 'straight', name: 'Đòn đấm thẳng' },
    { id: 'hook', name: 'Đòn móc ngang' },
    { id: 'uppercut', name: 'Đòn móc ngược' }
];




// 3. Hàm render danh mục Boxing
const renderBoxingCategory = () => {
    // Đảm bảo các phần tử DOM tồn tại trước khi thao tác
    if (!libraryFiltersContainer || !libraryGridContainer || !libraryDesc) return;
   
    let filterHTML = `<div class="flex gap-3 w-full overflow-x-auto hide-scrollbar pb-2 lg:pb-0">`;
    boxingFilters.forEach(f => {
        const activeClasses = f.id === 'all'
            ? 'bg-main-red text-white'
            : 'bg-white dark:bg-[#121214] text-text-secondary hover:text-text-primary border-gray-300 dark:border-gray-800 hover:border-main-red';
       
        filterHTML += `<button onclick="filterBoxing('${f.id}')" id="btn-filter-${f.id}" class="filter-btn shrink-0 px-6 py-3.5 font-bold rounded-xl text-sm tracking-wider uppercase border transition-colors ${activeClasses}">${f.name}</button>`;
    });
    filterHTML += `</div>`;
    libraryFiltersContainer.innerHTML = filterHTML;




    // Hiển thị toàn bộ dữ liệu ban đầu
    renderGrid(boxingDatabase);
    libraryDesc.innerText = `Thư viện Boxing đa dạng với ${boxingDatabase.length} đòn đấm từ cơ bản đến nâng cao.`;
};




// 4. Hàm xử lý khi click chọn bộ lọc
window.filterBoxing = (filterId) => {
    // Reset trạng thái tất cả các nút
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-main-red', 'text-white');
        btn.classList.add('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
    });
   
    // Kích hoạt nút được chọn
    const activeBtn = document.getElementById(`btn-filter-${filterId}`);
    if(activeBtn) {
        activeBtn.classList.remove('bg-white', 'dark:bg-[#121214]', 'text-text-secondary');
        activeBtn.classList.add('bg-main-red', 'text-white');
    }




    // Lọc dữ liệu
    if (filterId === 'all') {
        renderGrid(boxingDatabase);
    } else {
        const filteredData = boxingDatabase.filter(item => item.filter === filterId);
        renderGrid(filteredData);
    }
};
});



