const mainsmartphone = document.querySelector(".mainsmartphone"),
firstImg = mainsmartphone.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to mainsmartphone scroll left value
    let scrollWidth = mainsmartphone.scrollWidth - mainsmartphone.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = mainsmartphone.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = mainsmartphone.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the mainsmartphone scroll left else add to it
        mainsmartphone.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(mainsmartphone.scrollLeft - (mainsmartphone.scrollWidth - mainsmartphone.clientWidth) > -1 || mainsmartphone.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from mainsmartphone left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(mainsmartphone.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return mainsmartphone.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    mainsmartphone.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = mainsmartphone.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/mainsmartphone to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    mainsmartphone.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    mainsmartphone.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    mainsmartphone.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

mainsmartphone.addEventListener("mousedown", dragStart);
mainsmartphone.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
mainsmartphone.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
mainsmartphone.addEventListener("touchend", dragStop);