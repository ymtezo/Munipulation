# Changelog

All notable changes to the Munipulation plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-24

### Added

- Initial release of Munipulation plugin for Obsidian
- Command: "Process outliner instructions" to execute instructions on sub-levels
- `~~>[[]]` instruction: Move items to specified notes with backlinks
- `~~>TODOIST` instruction: Add items as tasks to Todoist
- Settings panel for Todoist API token configuration
- Automatic indentation detection (tabs and spaces)
- Error handling and user notifications
- Bilingual documentation (Japanese and English)
- Example file with usage demonstrations
- Development guide for contributors

### Features

- Intelligent sub-item collection based on indentation
- Automatic backlink creation when moving items
- Support for creating new notes if target doesn't exist
- Todoist API integration
- Extensible architecture for adding new instructions

### Documentation

- README.md with installation and usage instructions
- EXAMPLES.md with practical usage scenarios
- DEVELOPMENT.md with developer guidelines
- LICENSE file (MIT License)

[1.0.0]: https://github.com/ymtezo/Munipulation/releases/tag/1.0.0
