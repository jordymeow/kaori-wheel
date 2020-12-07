import { useMemo, useState } from "react"
import ActiveLink from './ActiveLink'

const Sidebar = (props) => {

  const { onOpened, onClosed } = props;
  const [ opened, setOpened ] = useState(true);
  const width = 270;
  const breakPoint = width + props.mainWidth;

  const sidebarMenuClassName = useMemo(() => {
    return opened ? "sidebar" : "sidebar active"
  }, [opened]);

  const customMenuText = useMemo(() => {
    return opened ? `☰` : `☰`;
  }, [opened]);

  const aromasJsx = useMemo(() => {
    if (!props.selectedAromas?.length) return null;
    return props.selectedAromas.map(v => {
      return <li style={{ fontSize: "0.875rem", padding: "4px 0" }}>{v}</li>;
    })
  }, [props.selectedAromas]);

  const onButtonClicked = () => {
    const isOpened = !opened;
    setOpened(isOpened);
    isOpened ? onOpened() : onClosed();
  }

  return (
    <>
      <nav className={sidebarMenuClassName}>
        <div className="custom-menu">
          <button type="button" className="btn" onClick={onButtonClicked}>
            <span>{customMenuText}</span>
          </button>
        </div>
        <div className="menu">
          <h1>Kaori Wheel</h1>
          <small>The Online Wine Aroma Wheel</small>
          <ul className="menu-list">
            <li>
              <ActiveLink activeClassName="active" href="/">
                <a className="link">Kaori Wheel</a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink activeClassName="active" href="/about">
                <a className="link">About</a>
              </ActiveLink>
            </li>
          </ul>
          <div className="selected-aromas">
            <h3>Aromas</h3>
            <ul className="selected-aromas-list">
              {aromasJsx}
            </ul>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .sidebar {
          min-width: 270px;
          max-width: 270px;
          background: #494ca2;
          color: #fff;
          transition: all 0.3s;
          position: relative;
          text-align: left;
        }
        @media (max-width: ${breakPoint}px) {
          .sidebar {
            height: 100vh;
            position: absolute;
            left: 0;
            z-index: 100;
          }
        }
        .sidebar {
          user-select: none;
        }
        .sidebar.active {
          margin-left: -270px;
        }
        .sidebar h1 {
          font-weight: 700;
          margin-bottom: 0px;
        }
        .sidebar small {
          display: block;
          margin-bottom: 20px;
        }
        .sidebar.active .custom-menu {
          margin-right: -50px;
        }
        .sidebar .custom-menu {
          display: inline-block;
          position: absolute;
          top: 20px;
          right: 0;
          margin-right: -20px;
          transition: 0.3s;
          z-index: 200;
        }
        .sidebar .custom-menu .btn {
          background: #393c7f;
          border: 1px solid #393c7f;
          border-radius: 50%;
          color: #fff;
          outline: none;
          cursor: pointer;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.5;
          padding: 0.375rem 0.75rem;
          text-align: center;
          vertical-align: middle;
          width: 40px;
          height: 40px;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        }
        .sidebar .custom-menu .btn > span {
          cursor: pointer;
        }
        .menu {
          padding: 1.5rem;
        }
        .menu-list,
        .selected-aromas-list {
          list-style: none;
          margin-bottom: 3rem;
          padding: 0;
        }
        .menu-list > li,
        .selected-aromas-list > li {
          font-size: 1rem;
        }
        .menu-list > li > .link {
          padding: 10px 0;
          display: block;
          color: rgba(255, 255, 255, 0.6);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: .3s all ease;
        }
        .menu-list > li > .link:hover {
          color: #fff;
        }
        .menu-list > li > .link.active {
          background: transparent;
          color: #fff;
        }
        .selected-aromas {
          margin-bottom: 3rem
        }
        .selected-aromas h3 {
          color: #fff;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  )
}

export default Sidebar;
