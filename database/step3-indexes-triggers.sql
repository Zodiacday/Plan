-- Step 3: Create indexes and triggers
CREATE INDEX idx_tools_category ON tools(category_id);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_featured ON tools(featured);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_group ON categories(category_group);
CREATE INDEX idx_tool_votes_tool ON tool_votes(tool_id);
CREATE INDEX idx_submissions_status ON tool_submissions(status);

CREATE OR REPLACE FUNCTION update_category_tool_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.status = 'approved' THEN
      UPDATE categories SET tool_count = tool_count + 1 WHERE id = NEW.category_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.status = 'approved' THEN
      UPDATE categories SET tool_count = tool_count - 1 WHERE id = OLD.category_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.category_id != NEW.category_id OR OLD.status != NEW.status THEN
      IF OLD.status = 'approved' THEN
        UPDATE categories SET tool_count = tool_count - 1 WHERE id = OLD.category_id;
      END IF;
      IF NEW.status = 'approved' THEN
        UPDATE categories SET tool_count = tool_count + 1 WHERE id = NEW.category_id;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tool_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON tools
FOR EACH ROW EXECUTE FUNCTION update_category_tool_count();

CREATE OR REPLACE FUNCTION update_tool_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE tools SET upvotes = upvotes + 1, total_votes = total_votes + 1 WHERE id = NEW.tool_id;
    ELSE
      UPDATE tools SET downvotes = downvotes + 1, total_votes = total_votes + 1 WHERE id = NEW.tool_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE tools SET upvotes = upvotes - 1, total_votes = total_votes - 1 WHERE id = OLD.tool_id;
    ELSE
      UPDATE tools SET downvotes = downvotes - 1, total_votes = total_votes - 1 WHERE id = OLD.tool_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.vote_type != NEW.vote_type THEN
      IF OLD.vote_type = 'up' THEN
        UPDATE tools SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.tool_id;
      ELSE
        UPDATE tools SET upvotes = upvotes + 1, downvotes = downvotes - 1 WHERE id = NEW.tool_id;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_votes_trigger
AFTER INSERT OR UPDATE OR DELETE ON tool_votes
FOR EACH ROW EXECUTE FUNCTION update_tool_votes();

SELECT 'Indexes and triggers created!' as status;
