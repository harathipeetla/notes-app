import {Component} from 'react'

const InitialNotesList = [
  {
    id: '1',
    title: 'ReactJs',
    description: 'Reactjs is a JS library',
    link: 'https://amazon.com',
    mediaType: 'image',
    mediaLink: 'https://via.placeholder.com/150',
    backgroundColor: '#ffffff',
  },
  {
    id: '2',
    title: 'NodeJS',
    description: 'Reactjs is a JS library',
    link: 'https://amazon.com',
    mediaType: 'video',
    mediaLink: 'https://www.w3schools.com/html/mov_bbb.mp4',
    backgroundColor: '#ffffff',
  },
  {
    id: '3',
    title: 'JavaScript',
    description: 'Reactjs is a JS library',
    link: 'https://amazon.com',
    mediaType: 'image',
    mediaLink: 'https://via.placeholder.com/150',
    backgroundColor: '#ffffff',
  },
]

class NoteForm extends Component {
  state = {
    NotesList: InitialNotesList,
    title: '',
    description: '',
    link: '',
    mediaType: 'image',
    mediaLink: '',
    backgroundColor: '#ffffff',
  }

  onChangeTitle = event => {
    const {value} = event.target
    this.setState({title: value})
  }

  onChangeDescription = event => {
    const {value} = event.target
    this.setState({description: value})
  }

  onChangeLink = event => {
    const {value} = event.target
    this.setState({link: value})
  }

  onChangeMediaType = event => {
    const {value} = event.target
    this.setState({mediaType: value})
  }

  onChangeMediaLink = event => {
    const {value} = event.target
    this.setState({mediaLink: value})
  }

  onChangeBackgroundColor = event => {
    const {value} = event.target
    this.setState({backgroundColor: value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {
      title,
      description,
      link,
      mediaType,
      mediaLink,
      backgroundColor,
    } = this.state
    const newNote = {
      title,
      description,
      link,
      mediaType,
      mediaLink,
      backgroundColor,
    }
    this.setState(prevState => ({
      NotesList: [...prevState.NotesList, newNote],
      title: '',
      description: '',
      link: '',
      mediaType: 'image',
      mediaLink: '',
      backgroundColor: '#ffffff',
    }))
  }

  render() {
    const {searchQuery} = this.props
    const {
      NotesList,
      title,
      description,
      link,
      mediaType,
      mediaLink,
      backgroundColor,
    } = this.state

    const filteredNotes = NotesList.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
      <div className="note-form-container">
        <h1>NoteForm</h1>

        <form onSubmit={this.onSubmitForm}>
          <label htmlFor="title">Enter Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={this.onChangeTitle}
          />
          <label htmlFor="description">Enter Description</label>
          <textarea
            id="description"
            value={description}
            onChange={this.onChangeDescription}
          />
          <label htmlFor="link">Enter Link</label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={this.onChangeLink}
          />

          <label htmlFor="mediaType">Media Type</label>
          <select
            id="mediaType"
            value={mediaType}
            onChange={this.onChangeMediaType}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          <label htmlFor="mediaLink">Media Link</label>
          <input
            id="mediaLink"
            type="text"
            value={mediaLink}
            onChange={this.onChangeMediaLink}
          />

          <label htmlFor="backgroundColor">Background Color</label>
          <input
            id="backgroundColor"
            type="color"
            value={backgroundColor}
            onChange={this.onChangeBackgroundColor}
          />

          <button type="submit">ADD</button>
        </form>

        <h2>Notes List:</h2>
        {filteredNotes.map(note => (
          <div
            key={note.id}
            style={{
              backgroundColor: note.backgroundColor,
              padding: '10px',
              margin: '10px',
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            {note.mediaType === 'image' ? (
              <img
                src={note.mediaLink}
                alt="Note media"
                style={{maxWidth: '100%'}}
              />
            ) : (
              <video controls style={{maxWidth: '100%'}}>
                <source src={note.mediaLink} type="video/mp4" />
                <track kind="captions" srcLang="en" label="English captions" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default NoteForm
