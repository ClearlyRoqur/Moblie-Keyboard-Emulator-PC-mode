javascript:(function(){
    const id = 'gamepad-v27';
    const old = document.getElementById(id);
    if(old) old.remove();

    const isPcActive = localStorage.getItem('pcModeEnabled') === 'true';

    const panel = document.createElement('div');
    panel.id = id;
    panel.style.cssText = 'position:fixed!important;top:0;left:0;width:100vw;height:100vh;z-index:2147483647!important;pointer-events:none!important;touch-action:none!important;-webkit-user-select:none!important;user-select:none!important;';

    const style = document.createElement('style');
    style.innerHTML = `
        #${id} .btn {
            position: absolute !important; background: rgba(40, 40, 40, 0.5) !important; color: white !important;
            border: 2px solid rgba(255, 255, 255, 0.6) !important; border-radius: 12px !important;
            font-family: Arial, sans-serif !important; font-weight: bold !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            pointer-events: auto !important; -webkit-touch-callout: none !important;
            -webkit-user-select: none !important; user-select: none !important; 
            -webkit-tap-highlight-color: transparent !important;
            touch-action: none !important; outline: none !important;
            transition: background 0.1s;
        }
        #${id} .btn.active { background: rgba(255, 255, 255, 0.9) !important; color: black !important; }
        #${id} .mode-switch {
            position: absolute !important; bottom: 80px; right: 40px; width: 140px; height: 45px;
            background: #222 !important; color: ${isPcActive ? '#00ff00' : '#ff4444'} !important; border: 2px solid ${isPcActive ? '#00ff00' : '#ff4444'} !important;
            border-radius: 20px !important; font-size: 10px !important; pointer-events: auto !important;
            display: flex !important; align-items: center !important; justify-content: center !important;
            -webkit-tap-highlight-color: transparent !important; z-index: 2147483647 !important;
        }
    `;
    panel.appendChild(style);

    if(isPcActive) {
        Object.defineProperty(navigator, 'maxTouchPoints', {get: () => 0});
        Object.defineProperty(navigator, 'platform', {get: () => 'Win32'});
    }

    const press = (k, c, kc, ak, ac, akc, type) => {
        const e = (key, code, v) => new KeyboardEvent(type, {key:key, code:code, keyCode:v, which:v, bubbles:true, cancelable:true, view:window, composed:true});
        window.dispatchEvent(e(k, c, kc));
        document.dispatchEvent(e(k, c, kc));
        if(ak) window.dispatchEvent(e(ak, ac, akc));
    };

    const add = (txt, t, l, r, b, w, h, k, c, kc, ak, ac, akc, fs) => {
        const el = document.createElement('div');
        el.className = 'btn';
        el.innerText = txt;
        if(t) el.style.top = t+'px'; if(l) el.style.left = l+'px'; if(r) el.style.right = r+'px'; if(b) el.style.bottom = b+'px';
        el.style.width = w+'px'; el.style.height = h+'px'; el.style.fontSize = fs+'px';
        const start = (e) => { e.preventDefault(); el.classList.add('active'); press(k, c, kc, ak, ac, akc, 'keydown'); };
        const end = (e) => { e.preventDefault(); el.classList.remove('active'); press(k, c, kc, ak, ac, akc, 'keyup'); };
        el.onpointerdown = start; el.onpointerup = end; el.onpointerleave = end;
        panel.appendChild(el);
    };

    const modeBtn = document.createElement('div');
    modeBtn.className = 'mode-switch';
    modeBtn.innerText = isPcActive ? 'PC MODE: ON' : 'PC MODE: OFF';
    modeBtn.onclick = (e) => { e.preventDefault(); localStorage.setItem('pcModeEnabled', !isPcActive); location.reload(); };
    panel.appendChild(modeBtn);

    /* --- TECLAS ACTUALIZADAS --- */
    add('1', 320, 70, 0, 0, 60, 60, '1', 'Digit1', 49, 0,0,0, 18);
    add('2', 320, 140, 0, 0, 60, 60, '2', 'Digit2', 50, 0,0,0, 18);
    add('3', 320, 210, 0, 0, 60, 60, '3', 'Digit3', 51, 0,0,0, 18);
    add('4', 320, 280, 0, 0, 60, 60, '4', 'Digit4', 52, 0,0,0, 18);

    add('Q', 407, 55, 0, 0, 75, 75, 'q', 'KeyQ', 81, 0,0,0, 20); 
    add('W', 400, 140, 0, 0, 90, 90, 'w', 'KeyW', 87, 'ArrowUp', 'ArrowUp', 38, 24); 
    add('E', 407, 240, 0, 0, 75, 75, 'e', 'KeyE', 69, 0,0,0, 20); 
    add('R', 407, 325, 0, 0, 75, 75, 'r', 'KeyR', 82, 0,0,0, 20);

    add('A', 500, 80, 0, 0, 90, 90, 'a', 'KeyA', 65, 'ArrowLeft', 'ArrowLeft', 37, 24);
    add('S', 500, 180, 0, 0, 90, 90, 's', 'KeyS', 83, 'ArrowDown', 'ArrowDown', 40, 24);
    add('D', 500, 280, 0, 0, 90, 90, 'd', 'KeyD', 68, 'ArrowRight', 'ArrowRight', 39, 24);
    
    /* F y G Medianas (75x75) y alineadas como Q y R */
    add('F', 507, 385, 0, 0, 75, 75, 'f', 'KeyF', 70, 0,0,0, 20); 
    add('G', 507, 475, 0, 0, 75, 75, 'g', 'KeyG', 71, 0,0,0, 20); 

    add('SHIFT', 640, 40, 0, 0, 130, 70, 'Shift', 'ShiftLeft', 16, 'Shift', 'ShiftRight', 16, 18);
    add('ESC', 720, 40, 0, 0, 130, 70, 'Escape', 'Escape', 27, 0,0,0, 18);
    add('ESPACIO', 0, 300, 0, 120, 450, 80, ' ', 'Space', 32, 0,0,0, 22);
    add('ENTER', 320, 0, 80, 0, 120, 85, 'Enter', 'Enter', 13, 0,0,0, 22);

    document.documentElement.appendChild(panel);
})();
