import React, { useState } from 'react'
import ModalDescription from './ModalDescription';
import ModalWindow from './ModalWindow';

export default function ModalOneBlock(props) {
    const [data, setData] = useState({});
    const imgSource = `./img/regionimg/${data.ImageName}`;
    React.useEffect(() => {
        fetch(props.apiLink)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            console.log(data);
          }
          )
        }, [props.apiLink]);

    return (
        <ModalWindow imgSource={imgSource} setModalOpen={props.setModalOpen}>
            <h2 className='oneblock-name'>{data.Name}</h2>
            <ModalDescription description={data.Description} fontSize={"1.2em"} />
        </ModalWindow>
    );
}