module.exports = {
    "roots": ["src/functions"],
    "transform": {"^.+\\.tsx?$": "ts-jest"},
    collectCoverage: true,
    coverageDirectory: 'coverage',
    slowTestThreshold: 10
}