const full_text = "zel.kim "
const comments = [
    "// developer",
    "// content creator",
    "// journalist",
    "// student leader",
    "// writer",
    "// gamer (?)"
];

const item_keys = [
    'galsify', 'equitygaming', 'pretzel', 'eastviscian',
    'gdg', 'gdsc', 'lscs', 'archerapi', 'evrshs-ssg', 
    'pakabuhi', 'peddlr'
];

let items = [];

const main = async () => {
    initiateTypeAnimation();
    blinkCursor();
    initializeEventListeners();
    await sleep(500);
    animateItemsBold(); 
    await sleep(500);
    animateItemsBold(); 
    await sleep(500);
    animateItemsBold();
}

const animateItemsBold = async () => {
    for(let item of item_keys) {
        const element = document.getElementById(item);
        element.classList.add('boldify');
        await sleep(100);
        element.classList.remove('boldify');
    }
}

const initializeEventListeners = () => {
    const info = document.getElementById('info-box');
    for(let item of item_keys) {
        const element = document.getElementById(item);
        element.addEventListener('click', async (event) => {
            event.preventDefault();
            const overlay = document.getElementById('overlay');
            info.innerHTML = await loadItemData(item);
            overlay.style.display = "flex";
            info.style.display = "block";
        });
    }

    const overlayElement = document.getElementById("overlay");
    overlayElement.addEventListener('click', (event) => {
        event.preventDefault();
        const overlay = document.getElementById('overlay');
        info.style.display = "none";
        overlay.style.display = "none"; 
    })
}

const loadItemData = async (item) => {
    let text;
    await fetch('pages/' + item + '.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        text = data;
        console.log(data);
        // You can now use the data from the JSON file
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
    return text;
}

const initiateTypeAnimation = async () => {
    
    const element = document.getElementById("icon-text");
    for(let i = 0; i < full_text.length; i++)
    {
        await sleep(150);
        element.innerHTML += full_text[i];
    }
    initiateIconComment(-1, 0);
}

const initiateIconComment = async (previous_comment, comment) => {
    
    const element = document.getElementById("icon-comment");
    for(let i = element.innerHTML.length; i > 0; i--)
    {
        await sleep(40);
        element.innerHTML = element.innerHTML.substring(0, i - 1);
    }
    element.innerHTML = ''
    for(let i = 0; i < comments[comment].length; i++)
    {
        await sleep(75);
        element.innerHTML += comments[comment][i];
    }
    await sleep(1000);
    const next = (comment == comments.length - 1) ? 0 : comment + 1;
    initiateIconComment(comment, next);
}


const blinkCursor = async () => {
    const element = document.getElementById("cursor-anim");
    element.innerHTML = element.innerHTML == "_" ? "" : "_";
    await sleep(250);
    blinkCursor();
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
