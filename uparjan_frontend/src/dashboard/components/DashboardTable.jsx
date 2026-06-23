import "./Dashboard.css";

const farmers = [
  {
    name: "Ram Kumar",
    district: "Bhopal",
    quantity: "120 MT",
  },
  {
    name: "Shyam Lal",
    district: "Indore",
    quantity: "90 MT",
  },
  {
    name: "Rakesh Patel",
    district: "Gwalior",
    quantity: "150 MT",
  },
];

export default function DashboardTable() {

  return (
    <div className="table-container">

      <h2>
        Recent Procurement
      </h2>

      <table>

        <thead>
          <tr>
            <th>Farmer</th>
            <th>District</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>

          {farmers.map((farmer, index) => (
            <tr key={index}>
              <td>{farmer.name}</td>
              <td>{farmer.district}</td>
              <td>{farmer.quantity}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}