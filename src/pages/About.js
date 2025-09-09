export default function About(){
  return (
    <div className="container my-4">
      <h1 className="h3">About the College & Events</h1>
      <p className="lead">XYZ College of Engineering, affiliated with ABC University.</p>
      <div className="row g-4">
        <div className="col-md-6">
          <h2 className="h5">Key Annual Events</h2>
          <ul>
            <li><strong>Technical:</strong> TechFest, Hackathon, Robotics Championship</li>
            <li><strong>Cultural:</strong> Annual Day, Music Nights, Dance Competitions</li>
            <li><strong>Sports:</strong> Inter-college Sports Meet</li>
          </ul>
          <p>Month-wise timelines and highlights are published every semester.</p>
        </div>
        <div className="col-md-6">
          <h2 className="h5">Organizing Bodies</h2>
          <p>Department committees, student clubs, and the student council collaborate to plan and execute events.</p>
        </div>
      </div>
    </div>
  )
}