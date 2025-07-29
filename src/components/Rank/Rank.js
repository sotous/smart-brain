import React from 'react';

class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: 0,
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
      return null;
    }
    this.generateEmoji(this.props.entries);
  }

  generateEmoji = (entries) => {
    fetch(`https://ojcqv180pi.execute-api.us-east-1.amazonaws.com?rank=${entries}`)
      .then(response => response.json())
      .then(data => this.setState({ emoji: data.emoji }))
      .catch(console.log);
  }

  render() {
    const { name, entries } = this.props;
    const { emoji} = this.state;
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {entries}
        </div>
        <div className='white f3'>
          {`Rank Badge: ${emoji}`}
        </div>
      </div>
      );
    }
}

export default Rank;