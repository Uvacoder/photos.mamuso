import Link from 'next/link';

const Meta = ({ photo = { fileName:null} }) => (
  <div id="meta">
    {photo.fileName == null ?
      (<p>Roses are red, violets are blue, and I’m terrible at color grading.</p>)
      :
      (<p>[photo.title</p>)
    }
  </div>
);

export default Meta;
