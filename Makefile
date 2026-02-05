.PHONY: help clean clean-all clean-rust clean-node dev build

# Default target - show help
help:
	@echo "Available commands:"
	@echo "  make clean       - Clean Rust/Tauri build artifacts"
	@echo "  make clean-rust  - Clean Rust build artifacts"
	@echo "  make clean-node  - Remove node_modules and package-lock.json"
	@echo "  make clean-all   - Full clean (Rust + Node)"
	@echo "  make reinstall   - Clean node_modules and reinstall"
	@echo "  make dev         - Run in development mode"
	@echo "  make build       - Production build"

# Clean Rust/Tauri build artifacts
clean-rust:
	@echo "Cleaning Rust build artifacts..."
	cd src-tauri && cargo clean
	rm -rf src-tauri/target

# Clean Node.js dependencies and cache
clean-node:
	@echo "Cleaning Node.js artifacts..."
	rm -rf node_modules
	rm -rf package-lock.json

# Clean all build artifacts (keeps node_modules)
clean:
	@echo "Cleaning all build artifacts..."
	cd src-tauri && cargo clean
	rm -rf src-tauri/target

# Full clean - removes everything including node_modules
clean-all: clean-rust clean-node
	@echo "Full clean complete!"

# Reinstall dependencies
reinstall: clean-node
	@echo "Reinstalling dependencies..."
	npm install

# Development mode
dev:
	npm run tauri dev

# Production build
build:
	npm run tauri build
