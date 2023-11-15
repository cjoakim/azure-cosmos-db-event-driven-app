module.exports = {
    "roots": ["src"],
    "transform": {"^.+\\.tsx?$": "ts-jest"},
    collectCoverage: true,
    coverageDirectory: 'coverage',
    slowTestThreshold: 10
}