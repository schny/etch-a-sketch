let gridSize = 16;
let gridPresent = false;
const gridContainer = document.querySelector('.grid-container');

let r = document.querySelector('#red');
let g = document.querySelector('#green');
let b = document.querySelector("#blue");

let userText = document.querySelector('#grid-size');
userText.addEventListener('keydown', function (e) {
    if (e.keyCode == 13 && userText.value >= 4 && userText.value <= 50) {
        gridSize = userText.value;
        deletePreviousGrid();
        createGrid(gridSize);
        changeColor('.sliderbg', '.grid-item');
        changeColor('.sliderpen', '.painted');
        drawOnGrid();
    }
    else if (e.keyCode == 13) {
        alert('Must enter a number between 4 and 50.')
    }

});

function deletePreviousGrid() {
    let gridColumns = document.querySelectorAll('.grid-column')
    let gridItems = document.querySelectorAll('.grid-item');
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].remove();
    }
    for (let i =0; i < gridColumns.length; i++) {
        gridColumns[i].remove();
    }
}

let clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', function () {
    let r = document.querySelector('#red').value;
    let g = document.querySelector('#green').value;
    let b = document.querySelector('#blue').value;

    paintedGridItems = document.querySelectorAll('.painted');
    for (let i = 0; i < paintedGridItems.length; i++) {
        paintedGridItems[i].classList.remove('painted');
        paintedGridItems[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
});

function changeColor (slider, item) {
    let input = document.querySelectorAll(slider);

    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('input', function () {
            let r = document.querySelector('#red').value;
            let g = document.querySelector('#green').value;
            let b = document.querySelector('#blue').value;
            
            let gridColor = document.querySelectorAll(item);
            for (let i = 0; i < gridColor.length; i++) {
                if (gridColor[i].classList.contains('painted')) {
                    continue;
                } else {
                    gridColor[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }
            }
        });
    }
}

function createGrid (gridSize) {

    let gridItemSize = (600 - (gridSize * 2)) / gridSize

    for (let i = 0; i < gridSize; i++) {

        gridColumn = document.createElement('div');
        gridColumn.classList.add('grid-column');

        
    
        for (let j = 0; j < gridSize; j++)
        {
            //create grid and set initial color to whatever
            //the slider values are
            gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.width = `${gridItemSize}px`;
            gridItem.style.height = `${gridItemSize}px`;
            let r = document.querySelector('#red').value;
            let g = document.querySelector('#green').value;
            let b = document.querySelector('#blue').value;
            gridItem.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            gridColumn.appendChild(gridItem);       
        }
    
        gridContainer.appendChild(gridColumn);
    }
}


function drawOnGrid () {
    gridItems = document.querySelectorAll('.grid-item');
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].addEventListener('mouseover', function () {
            let rgb = document.querySelector('#pen');
            //let r = document.querySelector('#sred').value;
            //let g = document.querySelector('#sgreen').value;
            //let b = document.querySelector('#sblue').value;
            this.classList.add('painted');
            this.style.backgroundColor = `${rgb.value}`;
            console.log(rgb.value);
        });
    }
}

let eraser = document.querySelector('#eraser');

eraser.addEventListener('change', eraseTiles);

function eraseTiles () {
    if (this.checked) {
        console.log('checked');
        gridItems = document.querySelectorAll('.grid-item');
        for (let i = 0; i < gridItems.length; i++) {
            gridItems[i].addEventListener('mouseover', function () {
                let r = document.querySelector('#red').value;
                let g = document.querySelector('#green').value;
                let b = document.querySelector('#blue').value;
                this.classList.remove('painted');
                this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            });
        }
    } else {
        drawOnGrid();
    }

}



