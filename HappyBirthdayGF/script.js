// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for greeting
const greetingText = "Hey You Know What! You're the most adorable human i ever met! 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Hearts animation
const heartEmojis = ['💗','💖','❤️','💕','💞'];
function createHeart(customDuration) {
	const heart = document.createElement('div');
	heart.className = 'heart';
	heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
	heart.style.left = Math.random() * 100 + 'vw';
	const size = Math.random() * 18 + 14;
	heart.style.fontSize = size + 'px';
	const drift = (Math.random() * 40 - 20) + 'vw';
	heart.style.setProperty('--tx', drift);
	const duration = customDuration || (Math.random() * 3 + 5) + 's';
	heart.style.animationDuration = duration;
	document.body.appendChild(heart);
	heart.addEventListener('animationend', () => heart.remove());
}

function burstHearts(count) {
	for (let i = 0; i < count; i++) {
		setTimeout(() => createHeart((Math.random() * 1.5 + 2) + 's'), i * 30);
	}
}

// Experience start after intro
function startExperience() {
    // Reveal container
    gsap.to('.container', { opacity: 1, duration: 0.6, ease: "power2.out" });

    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);

	// Start hearts stream
	setInterval(createHeart, 400);
}

// Intro logic
window.addEventListener('load', () => {
    const intro = document.querySelector('.intro-overlay');
    const introBtn = document.querySelector('.intro-button');
    const audio = document.getElementById('bgm');

    const enableLightsAndMusic = async () => {
        try {
            if (audio) {
                // Set or override source to backsound.mp3 on click
                if (!audio.src.includes('backsound.mp3')) {
                    audio.src = 'backsound.mp3';
                    audio.load();
                }
                audio.volume = 0.6;
                await audio.play();
            }
        } catch (err) {
            // Autoplay might be blocked, continue without failing
        }

        document.body.classList.add('lights-on');

        if (intro) {
            intro.classList.add('intro-hidden');
            gsap.to(intro, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => intro.remove()
            });
        }

        // Heart burst on start
        burstHearts(24);

        startExperience();
    };

    if (introBtn) {
        introBtn.addEventListener('click', enableLightsAndMusic);
    } else {
        // Fallback: start immediately if no intro (shouldn't happen)
        startExperience();
    }
});

// Hover effects
       // Hover effects
       document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        });

        // Smooth page transition on click
        button.addEventListener('click', () => {
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
            } catch (e) {}
            gsap.to('body', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    window.location.href = 'cause.html'; // Replace with the actual URL of the next page
                }
            });
        });
    });

// Save state on unload as a fallback
window.addEventListener('beforeunload', () => {
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
    } catch (e) {}
});