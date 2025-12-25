document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Script started successfully...");

    // --- CAR COLOR CHANGER CODE ---
    const modelViewer = document.querySelector('#reserve-car-model');
    const colorBtns = document.querySelectorAll('.color-btn');
    const colorNameDisplay = document.getElementById('color-name');

    // Check if the car model exists on this page before running code
    if (modelViewer) {
        
        modelViewer.addEventListener("load", () => {
            console.log("✅ Model loaded!");

            // 1. Define the material name (using the one from your screenshot)
            const paintMaterialName = "(0) Porsche_718CaymanG"; 
            const paintMaterial = modelViewer.model.materials.find(m => m.name === paintMaterialName);

            // 2. Check if we found it
            if (paintMaterial) {
                console.log("🎉 SUCCESS: Found car paint material! Buttons will work now.");
                
                // 3. Enable Buttons
                colorBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Update Name Text
                        if(colorNameDisplay) colorNameDisplay.textContent = btn.getAttribute('data-name');
                        
                        // Update Button Styling
                        colorBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');

                        // Change the Color
                        const colorHex = btn.getAttribute('data-color');
                        const rgba = hexToRgba(colorHex);
                        paintMaterial.pbrMetallicRoughness.setBaseColorFactor(rgba);
                    });
                });

            } else {
                console.error("⚠️ WARNING: Model loaded, but material name did not match.");
                console.log("Available materials:", modelViewer.model.materials.map(m => m.name));
            }
        });

    } else {
        // If we are on a page without the car, just do nothing (no error)
        console.log("ℹ️ No car model found on this page. Skipping 3D code.");
    }

    // Helper Function
    function hexToRgba(hex) {
        hex = hex.replace('#', '');
        return [
            parseInt(hex.substring(0, 2), 16) / 255,
            parseInt(hex.substring(2, 4), 16) / 255,
            parseInt(hex.substring(4, 6), 16) / 255,
            1.0
        ];
    }
});