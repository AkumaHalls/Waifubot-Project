<h1 align="center">
  <br>
  🌸 WaifuBot
  <br>
</h1>

<h4 align="center">A modern React-based Waifu collection game with gacha mechanics!</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#installation">Installation</a> •
  <a href="#credits">Credits</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Waifu.im-FF69B4?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTExLTIyVDIwOjQ3OjI4LTA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTExLTIyVDIwOjQ3OjI4LTA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0xMS0yMlQyMDo0NzoyOC0wODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphMjNhNDg2Yi0zYjY1LTRjNGItOWRkNi0wYjk0NDU5ZWU5Y2QiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2MjIxZjVhMC02OTZiLWE1NDgtODM4OS0yMjk4ZjM2NTVkNjQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2YzIzYTQ4Ni0zYjY1LTRjNGItOWRkNi0wYjk0NDU5ZWU5Y2QiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2YzIzYTQ4Ni0zYjY1LTRjNGItOWRkNi0wYjk0NDU5ZWU5Y2QiIHN0RXZ0OndoZW49IjIwMjMtMTEtMjJUMjA6NDc6MjgtMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyNC4wIChXaW5kb3dzKSIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7pV1m0AAAA/0lEQVQokZ2RMUoDURCGv31v14DYiYWFhYUgeAMPYOEJxCNYWFhYWFhYWFhYWFhYeAALCwsLwSKQiO7bsXgbCEk2m/jDwDDzz/wzw4yISBfYBWbAOfBmZp+1Rksi0gP2gBEwBR6Aa2PMR2LQWnsCXACDJC4iAyAHToEb4FhEVs3sELgDtoCeiJwAYyDUxs65U2A/8RvAkXOuMMYUxphX4B7YBp5FZKOyOQcugVfgwVr7CRTAyDl3lmZYWmvfgRvgCMittZOqwRqwC7wAj8aYuRlWxpiZtXYKPAE7wE/6WQBrwBD4Bn6B9ZT/AX6stfM/bf4XInXlX0REfgHCg2Junv4GMQAAAABJRU5ErkJggg==" />
</p>

## Key Features

🎮 **Engaging Gacha System**
* Free daily waifu pulls
* Premium gacha with rare characters
* Multiple rarity tiers (Common, Rare, Epic, Legendary)
* Dynamic pricing based on rarity

👤 **User Profiles**
* Experience and leveling system
* Achievement tracking
* Waifu collection management
* Daily rewards and points

⚙️ **Admin Features**
* User management system
* Ban/unban functionality
* Point balance adjustment
* User activity monitoring

🎨 **Modern UI/UX**
* Responsive design
* Real-time updates
* Animated notifications
* Tabbed interface

## How To Use

1. **Create an Account**
   * Register with username, email, and password
   * Get 500 starting points
   * Unlock your first achievement

2. **Collect Waifus**
   * Use free daily pulls
   * Spend points on premium gacha
   * Build your collection

3. **Level Up**
   * Gain XP through activities
   * Unlock achievements
   * Earn bonus points

4. **Admin Panel** (Admin users only)
   * Manage users
   * Adjust point balances
   * Monitor system activity

## Installation

```bash
# Clone this repository
git clone https://github.com/yourusername/waifu-bot

# Navigate to the project directory
cd waifu-bot

# Install dependencies
npm install

# Start the development server
npm start
```

## Credits

This software uses the following open source packages:

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
- [Waifu.im API](https://waifu.im/) - Anime image API

## License

MIT

---

> GitHub [@yourusername](https://github.com/yourusername) &nbsp;&middot;&nbsp;
> Twitter [@yourusername](https://twitter.com/yourusername)
