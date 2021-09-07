import React, { forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line react/display-name
const HeartOverlay  = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        addHeart() {
            let min = 1;
            let max = 6;
            let rand = min + Math.floor(Math.random() * (max-min));

            let el = '';
            switch ( rand ) {
                case 1:
                    el = <div className="heart x1"></div>;
                    break;
                case 2:
                    el = <div className="heart x2"></div>;
                    break;
                case 3:
                    el = <div className="heart x3"></div>;
                    break;
                case 4:
                    el = <div className="heart x4"></div>;
                    break;
                case 5:
                    el = <div className="heart x5"></div>;
                    break;
                case 6:
                    el = <div className="heart x6"></div>;
                    break;
            }

            // setChildren(newArr);
            let temp = document.createElement('div');
            temp.className='heart-item';

            ReactDOM.render(el, temp);

            let hearts = document.getElementsByClassName('heart-item');

            if(hearts.length > 50) {
                for( let i=0; i<25; i++) {
                    hearts[i].remove();
                }
            }
            document.getElementById("heart-wrapper").appendChild(temp);
        }
    }));

    return (
        <div className="wrapper" id="heart-wrapper"></div>
    );
});

export default HeartOverlay;
