export default function LoadingPlaceholder() {
  return (
    <div className="row g-4">
      {[...Array(3)].map((_, i) => (
        <div className="col-md-4" key={i}>
          <div className="card shadow-sm rounded-3 border-0">
            <div className="placeholder" style={{ height: '180px', borderRadius: '0.5rem 0.5rem 0 0' }} />
            <div className="card-body">
              <div className="placeholder-glow">
                <span className="placeholder col-8 mb-2"></span>
                <span className="placeholder col-6"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}