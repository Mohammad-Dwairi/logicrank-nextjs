import {ArrowContainer, Popover} from "react-tiny-popover";
import {useState} from "react";

const PopoverContent = props => (
    <ArrowContainer
        position={props.position}
        childRect={props.childRect}
        popoverRect={props.popoverRect}
        arrowColor={'#fff'}
        arrowSize={10}
        arrowStyle={{opacity: 0.7}}
        className='popover-arrow-container'
        arrowClassName='popover-arrow'
    >
        {props.children}
    </ArrowContainer>
);

const PopoverContainer = props => {

    const {children, content, positions} = props;

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <div onClick={() => setIsPopoverOpen(prev => !prev)} style={{zIndex: 2}}>
            <Popover
                containerStyle={{zIndex: '11'}}
                onClickOutside={() => setIsPopoverOpen(false)}
                isOpen={isPopoverOpen}
                positions={positions}
                content={({position, childRect, popoverRect}) => (
                    <PopoverContent
                        position={position}
                        childRect={childRect}
                        popoverRect={popoverRect}
                    >
                        {content}
                    </PopoverContent>
                )}
            >
                {children}
            </Popover>
        </div>

    );
};

export default PopoverContainer;