module.exports = {
  formatDate: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  formatSubject: (subject) => {
    switch (subject) {
      case 'vanillaJs':
        return 'Vanilla JS';
      case 'mySql':
        return 'mySQL JS';
      case 'nodeJs':
        return 'Node.JS';
      case 'express':
        return 'Express';
      case 'oop':
        return 'OOP';
      default:
        return null;
    }
  },
};
