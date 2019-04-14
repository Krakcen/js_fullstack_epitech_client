import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Alert.css';
import './animate.css';

const MySwal = withReactContent(Swal);

export default ({ ...options }) => {
  MySwal.fire({
    position: options.position || 'top-end',
    title: (
      <p style={{ color: 'white', fontWeight: 'normal' }}>
        {` ${options.title || ''}`}
      </p>
    ),
    // html: <p style={{ color: "white" }}>{`${options.text  || ""}`}</p>,
    backdrop: false,
    showConfirmButton: false,
    animation: false,
    timer: options.timer || 5500,
    allowEscapeKey: false,
    allowOutsideClick: false,
    background: options.color || 'limegreen',
    // customClass: 'tkw-alert-container',
    customClass: {
      popup: 'animated fadeInUp',
      header: 'tkw-alert-container',
    },
    toast: true,
  });
};
