const pow = Math.pow;
const easeOutQuart = x => 1 - pow(1 - x, 4);
const animateScroll = ({ targetPosition, initialPosition }) => {
    let start;
    let position;
    let animationFrame;

    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;

    // maximum amount of pixels we can scroll
    const maxAvailableScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const amountOfPixelsToScroll = initialPosition - targetPosition;

    const step = timestamp => {
        if (start === undefined) start = timestamp;
        const elapsed = timestamp - start;

        // this just gives us a number between 0 (start) and 1 (end)
        const relativeProgress = elapsed / 1500;

        // ease out that number
        const easedProgress = easeOutQuart(relativeProgress);

        // calculate new position for every thick of the requestAnimationFrame
        position = initialPosition - amountOfPixelsToScroll * Math.min(easedProgress, 1);

        // set the scrollbar position
        window.scrollTo(0, position);

        // Stop when max scroll is reached
        if (
            initialPosition !== maxAvailableScroll &&
            window.scrollY === maxAvailableScroll
        ) {
            cancelAnimationFrame(animationFrame);
            return;
        }

        // repeat until the end is reached
        if (elapsed < 1500) animationFrame = requestAnimationFrame(step);

        // console.info('targetPosition : ', targetPosition);
        // console.info('initialPosition : ', initialPosition);
        // console.info('maxAvailableScroll : ', maxAvailableScroll);
        // console.info('amountOfPixelsToScroll : ', amountOfPixelsToScroll);
        // console.info('elapsed : ', elapsed);
        // console.info('timestamp : ', timestamp);
        // console.info('relativeProgress : ', relativeProgress);
        // console.info('easedProgress : ', easedProgress);
        // console.info('position : ', position);
    }
    animationFrame = requestAnimationFrame(step);
}

const getElementPosition = element => element.offsetTop;

export const scrollTo = ({ id }) => {
    // the position of the scroll bar before the user clicks the button
    const initialPosition = window.scrollY;

    // decide what type of reference that is
    // if neither ref or id is provided  set element to null
    const element = document.getElementById(id);

    if (!element) {
        // log error if the reference passed is invalid
        console.error("Invalid element, are you sure you've provided element id or react ref?");
        return;
    }

    animateScroll({
        targetPosition: getElementPosition(element),
        initialPosition,
    });
};
