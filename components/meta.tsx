import Link from 'next/link';

const Meta = ({ photo }: any) => (
  <div id="meta">
    {photo.fileName == null ?
      (<p>Mostly a collection of yellowish photos.</p>)
      :
      (
        <div>
          <p><strong>{photo.title}</strong></p>
          <p>{photo.date}</p>

          <div className="photo-meta">
            {photo.camera ? <p>{photo.camera}</p> : null}
            {photo.fnumber ? <p>ƒ/{photo.fnumber.toFixed(1)}</p> : null}
            {photo.exposureBiasValue ? <p>{photo.exposureBiasValue.toFixed(1)}</p> : null}
            {photo.exposureTime ? <p>{photo.exposureTime}s</p> : null}
            {photo.iso ? <p>ISO {photo.iso}</p> : null}
          </div>
          <div className="photo-meta">
            {photo.GPSLatitude ? (<p>{photo.GPSLatitude} N, {photo.GPSLongitude} W</p>) : null}
          </div>
        </div>
      )
    }
  </div>
);

export default Meta;
