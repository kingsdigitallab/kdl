const OrganisationsToMarkdown = require("../src/organisations-to-md");
const fs = require("fs/promises");
const path = require("path");

// Mock fs/promises
jest.mock("fs/promises");

describe("OrganisationsToMarkdown", () => {
  let converter;
  const outputPath = "/test/output";

  beforeEach(() => {
    converter = new OrganisationsToMarkdown(outputPath);
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("convert", () => {
    it("should convert organisations to markdown files", async () => {
      const mockOrgs = [
        {
          agent: {
            name: "Test Org",
            alternateName: "TO",
            slug: "test-org",
            description: "A test organisation",
            url: [
              {
                linkrole_id: {
                  name: "Website",
                  url: "https://test.org",
                },
              },
            ],
          },
          foundingDate: "2020-01-01",
          dissolutionDate: null,
          parentOrganisation: {
            agent: {
              name: "Parent Org",
              slug: "parent-org",
              alternateName: "PO",
            },
          },
          subOrganisation: [
            {
              agent: {
                name: "Sub Org",
                slug: "sub-org",
                alternateName: "SO",
              },
            },
          ],
        },
      ];

      await converter.convert(mockOrgs);

      // Check if directory was created
      expect(fs.mkdir).toHaveBeenCalledWith(outputPath, { recursive: true });

      // Check if file was written with correct content
      const expectedContent = [
        "---",
        "title: Test Org",
        "alternateName: TO",
        "slug: test-org",
        "foundingDate: 2020-01-01",
        "dissolutionDate: null",
        "parentOrganisation:",
        "  name: Parent Org",
        "  slug: parent-org",
        "  alternateName: PO",
        "subOrganisations:",
        "  - name: Sub Org",
        "    slug: sub-org",
        "    alternateName: SO",
        "urls:",
        "  - type: Website",
        "    url: https://test.org",
        "---",
        "",
        "A test organisation",
      ].join("\n");

      expect(fs.writeFile).toHaveBeenCalledWith(
        path.join(outputPath, "test-org.md"),
        expectedContent
      );
    });
  });

  describe("processParentOrg", () => {
    it("should return null if no parent organisation", () => {
      expect(converter.processParentOrg(null)).toBeNull();
    });

    it("should process parent organisation correctly", () => {
      const parent = {
        agent: {
          name: "Parent Org",
          slug: "parent-org",
          alternateName: "PO",
        },
      };

      expect(converter.processParentOrg(parent)).toEqual({
        name: "Parent Org",
        slug: "parent-org",
        alternateName: "PO",
      });
    });
  });

  describe("processSubOrgs", () => {
    it("should return empty array if no sub-organisations", () => {
      expect(converter.processSubOrgs(null)).toEqual([]);
    });

    it("should process sub-organisations correctly", () => {
      const subs = [
        {
          agent: {
            name: "Sub Org 1",
            slug: "sub-org-1",
            alternateName: "SO1",
          },
        },
        {
          agent: {
            name: "Sub Org 2",
            slug: "sub-org-2",
            alternateName: "SO2",
          },
        },
      ];

      expect(converter.processSubOrgs(subs)).toEqual([
        {
          name: "Sub Org 1",
          slug: "sub-org-1",
          alternateName: "SO1",
        },
        {
          name: "Sub Org 2",
          slug: "sub-org-2",
          alternateName: "SO2",
        },
      ]);
    });
  });

  describe("processUrls", () => {
    it("should return empty array if no URLs", () => {
      expect(converter.processUrls(null)).toEqual([]);
    });

    it("should process URLs correctly", () => {
      const urls = [
        {
          linkrole_id: {
            name: "Website",
            url: "https://test1.org",
          },
        },
        {
          linkrole_id: {
            name: "Repository",
            url: "https://github.com/test",
          },
        },
      ];

      expect(converter.processUrls(urls)).toEqual([
        {
          type: "Website",
          url: "https://test1.org",
        },
        {
          type: "Repository",
          url: "https://github.com/test",
        },
      ]);
    });
  });
});
