const container = document.getElementsByClassName("container");
console.log(container);

const bubble = document.getElementById("bubble");
const selection = document.getElementById("selection");
const insertion = document.getElementById("insertion");
const merge = document.getElementById("merge");
const quick = document.getElementById("quick");
const reset = document.getElementById("resetBtn"); 

let originalArr = [9, 7, 4, 3, 2, 2, 5, 1, 0];
let arr = [...originalArr];

let arrDiv = document.getElementById("arrDiv");
let sortedArr = document.getElementById("sortedArr");

// Initial rendering of the array
function displayArray() {
    arrDiv.innerHTML = "";
    arr.forEach((elm) => {
        let div = document.createElement("div");
        div.textContent = elm;
        div.style.display = "inline-block";
        div.style.margin = "5px";
        div.style.padding = "5px";
        div.style.background = "lightgray";
        div.style.border = "1px solid black";
        div.style.textAlign = "center";
        arrDiv.appendChild(div);
    });
}

// Create visual bars
function createBars(arr) {
    sortedArr.innerHTML = "";
    arr.forEach((value) => {
        let bar = document.createElement("div");
        bar.style.height = `${value * 20}px`;
        bar.style.width = "30px";
        bar.style.margin = "2px";
        bar.style.display = "inline-block";
        bar.style.background = "teal";
        bar.style.transition = "height 0.2s ease-in-out";
        bar.style.position = "relative";
        bar.style.textAlign = "center";

        // Text inside bar
        let text = document.createElement("span");
        text.textContent = value;
        text.style.position = "absolute";
        text.style.top = "50%";
        text.style.left = "50%";
        text.style.transform = "translate(-50%, -50%)";
        text.style.color = "white";
        text.style.fontWeight = "bold";
        
        bar.appendChild(text);
        sortedArr.appendChild(bar);
    });
}

async function bubbleSort(arr) {
    let bars = sortedArr.children;
    for (let i = arr.length - 1; i >= 0; i--) {
        let didSwap = false;
        for (let j = 0; j < i; j++) {
            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            await new Promise((resolve) => setTimeout(resolve, 300));

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                bars[j].style.height = `${arr[j] * 20}px`;
                bars[j + 1].style.height = `${arr[j + 1] * 20}px`;
                bars[j].firstChild.textContent = arr[j];
                bars[j + 1].firstChild.textContent = arr[j + 1];

                didSwap = true;
            }

            bars[j].style.background = "teal";
            bars[j + 1].style.background = "teal";
        }

        if (!didSwap) break;
    }
}

async function selectionSort(arr) {
    let bars = sortedArr.children;
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.background = "red";

        for (let j = i + 1; j < n; j++) {
            bars[j].style.background = "yellow";
            await new Promise((resolve) => setTimeout(resolve, 300));

            if (arr[j] < arr[minIndex]) {
                bars[minIndex].style.background = "teal";
                minIndex = j;
                bars[minIndex].style.background = "red";
            }
            bars[j].style.background = "teal";
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

            bars[i].style.height = `${arr[i] * 20}px`;
            bars[minIndex].style.height = `${arr[minIndex] * 20}px`;
            bars[i].firstChild.textContent = arr[i];
            bars[minIndex].firstChild.textContent = arr[minIndex];
        }

        bars[i].style.background = "green";
    }
    bars[n - 1].style.background = "green";
}

async function insertionSort(arr) {
    let bars = sortedArr.children;
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        bars[i].style.background = "red";
        await new Promise((resolve) => setTimeout(resolve, 500));

        while (j >= 0 && arr[j] > key) {
            bars[j].style.background = "yellow";
            arr[j + 1] = arr[j];

            bars[j + 1].style.height = `${arr[j + 1] * 20}px`;
            bars[j + 1].firstChild.textContent = arr[j + 1];

            await new Promise((resolve) => setTimeout(resolve, 300));
            bars[j].style.background = "teal";
            j--;
        }

        arr[j + 1] = key;
        bars[j + 1].style.height = `${arr[j + 1] * 20}px`;
        bars[j + 1].firstChild.textContent = arr[j + 1];

        bars[i].style.background = "green";
    }
    bars[n - 1].style.background = "green";
}


async function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return;
    }

    let mid = Math.floor((left + right) / 2);

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merges(arr, left, mid, right);
}

async function merges(arr, left, mid, right) {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;
    let bars = sortedArr.children;

    while (i < leftArr.length && j < rightArr.length) {
        bars[left + i].style.background = "red";  // Highlight left part
        bars[mid + 1 + j].style.background = "blue";  // Highlight right part

        await new Promise((resolve) => setTimeout(resolve, 300));

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            bars[k].style.height = `${leftArr[i] * 20}px`;
            i++;
        } else {
            arr[k] = rightArr[j];
            bars[k].style.height = `${rightArr[j] * 20}px`;
            j++;
        }

        bars[k].style.background = "green"; // Sorted section
        k++;
    }

    while (i < leftArr.length) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        arr[k] = leftArr[i];
        bars[k].style.height = `${leftArr[i] * 20}px`;
        bars[k].style.background = "green";
        i++;
        k++;
    }

    while (j < rightArr.length) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        arr[k] = rightArr[j];
        bars[k].style.height = `${rightArr[j] * 20}px`;
        bars[k].style.background = "green";
        j++;
        k++;
    }
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
}

async function partition(arr, left, right) {
    let bars = sortedArr.children;
    let pivot = arr[right];
    let i = left - 1;

    bars[right].style.background = "blue";
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let j = left; j < right; j++) {
        bars[j].style.background = "red";
        await new Promise((resolve) => setTimeout(resolve, 300));

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            bars[i].style.height = `${arr[i] * 20}px`;
            bars[j].style.height = `${arr[j] * 20}px`;
            bars[i].firstChild.textContent = arr[i];
            bars[j].firstChild.textContent = arr[j];

            await new Promise((resolve) => setTimeout(resolve, 300));
        }
        bars[j].style.background = "teal";
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1] * 20}px`;
    bars[right].style.height = `${arr[right] * 20}px`;
    bars[i + 1].firstChild.textContent = arr[i + 1];
    bars[right].firstChild.textContent = arr[right];

    bars[i + 1].style.background = "green";
    bars[right].style.background = "teal";

    await new Promise((resolve) => setTimeout(resolve, 500));
    return i + 1;
}


// Event Listeners
bubble.addEventListener("click", () => { createBars(arr); bubbleSort(arr); });
selection.addEventListener("click", () => { createBars(arr); selectionSort(arr); });
insertion.addEventListener("click", () => { createBars(arr); insertionSort(arr); });
quick.addEventListener("click", () => { createBars(arr); quickSort(arr); });
reset.addEventListener("click", () => { arr = [...originalArr]; displayArray(); createBars(arr); });
merge.addEventListener("click", async() => {
    createBars(arr);
     await mergeSort(arr);
})

// Initial Rendering
displayArray();
createBars(arr);