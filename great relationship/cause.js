 // Reasons database
 const reasons = [
    { 
        text: "halo sayanggg ciee udah 19 taun aja ni, semoga yang kamu inginkan terkabul yaa jangan lupa berdoa juga pastina umur ga kerasa makin nambah aja yaa kaya beban idupnya duh 💖", 
        emoji: "🌟",
        gif: "gif1.gif"
    },
    { 
        text: "mungkin hari kamu ga selalu mulus yaa tapi setidanya kamu masi ada orang terdekat kamu yang selalu support dan paling penting jangan lupa ka allah yaa, belajar nya makin rajin lagi kamu nanti bisa aja menghadapi hal hal yg besar kan persipakan diri aja oteyy. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "aku harap kamu sukses kedepan na banyak uang na pastina semoga tercapai menjadi finansial freedom aku doain terbaik buat kamu kita wudujkan membeli apa yang kita mau nanti yaa mobil idaman kamu tu porsche. 😁 ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "keep strong my girl, kamu kan wonder women yaa tapi pas di pontianak aja disini pasti beda lagi gapapa kuat kamu disana yaa meski kemauan kamu ga terwujud mau pulang cepet but isokee tahun depan kita insyaallah ketemu yaa nanti aku kalo udah berpengahsilan juga mau nyoba kesana jalan jalan di kota pontianak ngenalin segala hal yang belum tau 🫂 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "enter our storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        // Persist audio state before leaving
                        const audio = document.getElementById('bgm');
                        try {
                            if (audio) {
                                const state = {
                                    src: audio.currentSrc || audio.src || 'backsound.mp3',
                                    time: audio.currentTime || 0,
                                    volume: audio.volume || 0.6,
                                    playing: !audio.paused
                                };
                                sessionStorage.setItem('bgmState', JSON.stringify(state));
                            }
                        } catch(e) {}
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);