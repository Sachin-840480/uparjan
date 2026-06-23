import "./Dashboard.css";

export default function Header() {
  return (
    <div className="header">

      <div className="header-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
          alt="logo"
          className="logo"
        />
      </div>

      <div className="header-center">
        <h1>ई-उपार्जन पोर्टल</h1>

        <p>
          खाद्य, नागरिक आपूर्ति एवं
          उपभोक्ता संरक्षण विभाग
        </p>
      </div>

    </div>
  );
}