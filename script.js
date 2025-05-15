function toggleMenu() {
    const m = document.getElementById('menu');
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
    m.style.flexDirection = 'column';
}

function showSection(id, push = true) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.getElementById('menu').style.display = 'none';
    if (push) {
        let path = '/';
        if (id !== 'start') {
            if (['matematik', 'svenska', 'engelska', 'ai', 'programmering', 'fysik', 'webbutveckling', 'daodac'].includes(id)) {
                path = '/kurser/' + id;
            } else {
                path = '/' + id;
            }
        }
        history.pushState({ section: id }, '', path);
    }
}

window.onpopstate = e => {
    const sec = (e.state && e.state.section) || '';
    showSection(sec, false);
};

document.addEventListener('DOMContentLoaded', () => {
    const h = location.hash.replace('#', '');
    if (h) showSection(h, false);
});

document.addEventListener('DOMContentLoaded', () => {
    const weeks = [
        ...Array.from({ length: 51 - 33 + 1 }, (_, i) => `v${33 + i}`),
        ...Array.from({ length: 19 - 2 + 1 }, (_, i) => `v${2 + i}`)
    ];

    const data = {
        v33: { narvaro: 1 },
        v34: { narvaro: 14 },
        v35: { narvaro: 15 },
        v36: { narvaro: 17 },
        v37: { narvaro: 17, oanmäld: 1 },
        v38: { narvaro: 16, anmäld: 2, föranm: 2 },
        v39: { narvaro: 17, sen: 1 },
        v40: { narvaro: 3, anmäld: 12, föranm: 12 },
        v41: { narvaro: 14, oanmäld: 1, sen: 1, frånv: 1 },
        v42: { narvaro: 18 },
        v43: { narvaro: 16 },
        v45: { narvaro: 10, anmäld: 4 },
        v46: { narvaro: 18 },
        v47: { narvaro: 18 },
        v48: { narvaro: 18 },
        v49: { narvaro: 11 },
        v50: { narvaro: 14 },
        v51: { narvaro: 14 },
        v2: { narvaro: 9, frånv: 1 },
        v3: { narvaro: 17, sen: 1 },
        v4: { narvaro: 16, föranm: 2 },
        v5: { narvaro: 17, frånv: 1 },
        v6: { narvaro: 13 },
        v7: { narvaro: 18 },
        v8: { narvaro: 12 },
        v10: { narvaro: 15 },
        v11: { narvaro: 16, frånv: 1 },
        v12: { narvaro: 16, frånv: 1 },
        v13: { narvaro: 18 },
        v14: { narvaro: 17 },
        v15: { narvaro: 13 },
        v16: { narvaro: 13 },
        v18: { föranm: 8 },
        v19: { narvaro: 8, föranm: 4 }
    };

    const tbody = document.getElementById('narvaro-body');

    weeks.forEach(week => {
        const d = data[week] || {};
        const narvaro = d.narvaro || 0;
        const oanmäld = d.oanmäld || 0;
        const anmäld = d.anmäld || 0;

        const total = narvaro + oanmäld + anmäld;
        const procent = total > 0 ? (narvaro / total * 100).toFixed(1) : '0.0';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${week}</td>
            <td>${total} st (${procent}%)</td>
            <td>${oanmäld} st (${total ? (oanmäld / total * 100).toFixed(1) : '0.0'}%)</td>
            <td>${anmäld} st (${total ? (anmäld / total * 100).toFixed(1) : '0.0'}%)</td>
            <td>${narvaro} st</td>
            <td>${d.sen ? d.sen + ' st' : '-'}</td>
            <td>${d.frånv ? d.frånv + ' st' : '-'}</td>
            <td>${d.föranm ? d.föranm + ' st' : '-'}</td>
        `;
        tbody.appendChild(tr);
    });

    // Lägg till summering (v27–v26)
    let sumTotal = 0, sumNarvaro = 0, sumOanmäld = 0, sumAnmäld = 0;
    let sumSen = 0, sumFrånv = 0, sumFöranm = 0;

    weeks.forEach(week => {
        const d = data[week] || {};
        const narvaro = d.narvaro || 0;
        const oanmäld = d.oanmäld || 0;
        const anmäld = d.anmäld || 0;
        const sen = d.sen || 0;
        const frånv = d.frånv || 0;
        const föranm = d.föranm || 0;

        const total = narvaro + oanmäld + anmäld;

        sumTotal += total;
        sumNarvaro += narvaro;
        sumOanmäld += oanmäld;
        sumAnmäld += anmäld;
        sumSen += sen;
        sumFrånv += frånv;
        sumFöranm += föranm;
    });

    const trSum = document.createElement('tr');
    trSum.innerHTML = `
        <td><strong>v27–v26</strong></td>
        <td><strong>${sumTotal} st (${(sumNarvaro / sumTotal * 100).toFixed(1)}%)</strong></td>
        <td><strong>${sumOanmäld} st (${(sumOanmäld / sumTotal * 100).toFixed(1)}%)</strong></td>
        <td><strong>${sumAnmäld} st (${(sumAnmäld / sumTotal * 100).toFixed(1)}%)</strong></td>
        <td><strong>${sumNarvaro} st</strong></td>
        <td><strong>${sumSen} st</strong></td>
        <td><strong>${sumFrånv} st</strong></td>
        <td><strong>${sumFöranm} st</strong></td>
    `;
    tbody.appendChild(trSum);
});