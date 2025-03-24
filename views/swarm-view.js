import { BaseView } from './view.js'

export class SwarmView extends BaseView {
    constructor() {
        super('bees-content')
    }

    renderSwarm(bees) {
        if (!this.container) return;

        this.container.innerHTML = '';

        bees.forEach(bee => {
            let beeDiv = document.createElement("div");
            beeDiv.className = 'bee';
            beeDiv.id = `bee-${bee.id}`;

            let img = document.createElement("img");
            img.src = bee.imgUrl;

            let beeName = document.createElement("p");
            beeName.className = 'bee-name';
            beeName.textContent = bee.name;

            let hp = document.createElement("p");
            hp.className = 'bee-hp';
            hp.textContent = `${bee.currentHP} / ${bee.maxHP}`;

            beeDiv.appendChild(img);
            beeDiv.appendChild(beeName);
            beeDiv.appendChild(hp);

            this.container.appendChild(beeDiv);
        });
    }

    updateBee(bee, showDamageTaken = true) {
        let beeDiv = document.getElementById(`bee-${bee.id}`);

        if (beeDiv) {
            let beeHPElement = beeDiv.querySelector('.bee-hp');

            beeHPElement.textContent = bee.currentHP <= 0 ? 'DEAD' : `${bee.currentHP}/${bee.maxHP}`;

            if (bee.currentHP < (bee.maxHP / 4)) {
                beeHPElement.classList.add('bee-critical');
            } else if (bee.currentHP < (bee.maxHP * 0.75)) {
                beeHPElement.classList.add('bee-damaged');
            }

            if (showDamageTaken) {
                this.showDamageNumber(beeDiv, bee.damageTaken);
            }
        }
    }

    showDamageNumber(beeDiv, damage) {
        const damageDiv = document.createElement('div');
        damageDiv.className = 'damage-number';
        damageDiv.textContent = `-${damage}`;

        damageDiv.style.position = 'absolute';
        damageDiv.style.color = 'red';
        damageDiv.style.fontWeight = '500';
        damageDiv.style.fontSize = '3rem';

        const rect = beeDiv.getBoundingClientRect();
        damageDiv.style.left = (rect.width / 2) + 'px';
        damageDiv.style.top = (rect.height / 3) + 'px';

        beeDiv.style.position = 'relative';
        beeDiv.appendChild(damageDiv);

        let start = null;
        const duration = 1500;

        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percent = Math.min(progress / duration, 1);

            damageDiv.style.transform = `translateY(-${percent * 50}px)`;
            damageDiv.style.opacity = (1 - percent).toString();

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                if (beeDiv.contains(damageDiv)) {
                    beeDiv.removeChild(damageDiv);
                }
            }
        }

        requestAnimationFrame(animate);

        beeDiv.classList.add('shake');

        setTimeout(() => {
            beeDiv.classList.remove('shake');
        }, 500);
    }
}