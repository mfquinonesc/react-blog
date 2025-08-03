export default function Footer() {
  return (
    <footer className="footer has-background-grey-lighter has-text-centered">
      <small>This page was built using the following technologies:</small>

      <ul className="is-flex is-flex-direction-row is-justify-content-center">             
        <li className="m-3 is-size-4"><i className="fa-brands fa-react"></i></li>
        <li className="m-3 is-size-4"><i className="fa-brands fa-node-js"></i></li>
        <li className="m-3 is-size-4"><i className="fa-brands fa-html5"></i></li>
        <li className="m-3 is-size-4"><i className="fa-brands fa-js"></i></li>
        <li className="m-3 is-size-4"><i className="fa-brands fa-css3-alt"></i></li>
      </ul>
      
      <strong>Manuel Quiñones</strong>      
    </footer>
  );
}
