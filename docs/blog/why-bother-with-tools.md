---
title: Why bother with tools when you can simply chat?
subtitle: The role of DH tools in the age of AI
tags:
  - post
authors:
  - John Bradley (King's College London)
  - Geoffrey Rockwell (University of Alberta)
date: 2026-11-12 # PLACEHOLDER: confirm publication date
---

The emergence of Generative AI has unsettled a great many assumptions in
society at large, and in the Digital Humanities in particular. For DH,
assumptions have been disturbed about how digital tools might serve the
humanities, and indeed about what a digital tool or representation even
is. And the interest is not only in the DH community. Large Language
Models (LLMs) have got the attention of traditional, non-DH, literary
scholars too. Perhaps they are drawn in by the chatty responsive ability
of these systems. By “simply chatting” (to quote our paper’s title),
scholars are now testing LLMs against the kinds of interpretive
questions that literary criticism has always asked. The results are
controversial. Many remain deeply sceptical. But the exploration is
happening.

Henry Oliver's blog post "How good is AI at literary criticism?" (Oliver 2025) captures one key difficulty in assessing LLMs here: assertions in
humanities scholarship tend to be grounded in subjective insight rather
than verifiable data. As Oliver notes:

> One problem is that it is possible to verify a wrong answer in the
> sciences quite easily. Whereas in literature we are more likely to say
> an answer is bad than wrong, opening up the possibility of mediocrity
> defending itself with the weak sword of personal opinion.

There is no objective measure of success, and that makes it genuinely
hard to assess what LLMs contribute here.

In this post, however, we are not thinking about how LLMs fare at
traditional literary criticism. Instead, we're interested in textual
interpretation from the perspective of a more formal branch of the
Digital Humanities: what’s called digital text analysis.

Text analysis has a long history, and arose out of the wish to establish
a kind of humanities textual research that was more objective – to
address exactly the issue Oliver mentioned in the quote above. Rosanne
Potter, a relatively early advocate, argued for numeric and statistical
methods as a more objective alternative to individual scholarly insight
(Potter 1988, xxix). More recently, Ted Underwood's _Distant Horizons_
(Underwood 2019) applied machine learning methods to uncover literary
trends across large corpora that covered substantial periods of history
— what Franco Moretti called "distant reading". He claims his work is
something that could not be done until relatively recently (Underwood
2019, xv).

This data-oriented approach, although long standing, has not won
everyone over. Johanna Drucker, writing in PMLA, distinguishes between
what she calls computational "processing" and genuine scholarly
"reading", and goes on to say:

> Processing is not reading. It is literal, automatic, and repetitive.
> Reading is ideational, hermeneutic, generative, and productive.
> Processing strives for accuracy, reading for leniency or
> transformation. (Drucker 2017, 630)

She argues that the graphs and tables produced by text analysis tools
don't provide semantically meaningful expressions of literary text
(Drucker 2017, 633). In contrast, Underwood is more conciliatory: he
proposes a balance where computational methods complement rather than
displace traditional scholarship. Some of this is discussed in Underwood
2019 in the area of page 153.

This tension is what we want to explore.

There is an interesting parallel here with the history of AI itself.
Early AI was built on symbolic representation — formal models of
knowledge. It never quite worked. The AI we now call "AI"; built on
ultra high-dimensional vectors, probability, and neural network
approaches; is emphatically non-symbolic. Those who remembered the old
symbolic approach coined the affectionate acronym GOFAI to represent it:
Good Old-Fashioned AI.

By analogy, we have proposed the name GOFTA — Good Old-Fashioned Text
Analysis — for DH’s text analysis paradigm. Like GOFAI, GOFTA is
grounded in formal symbolic representation. Like GOFAI, it has struggled
to prove its value to a broad scholarly audience. And like GOFAI, its
fundamental assumptions are now being disturbed by Generative AI.

The question we are asking here is this: can the emphatically
non-symbolic world of LLMs interact productively with the highly
symbolic world of GOFTA?

The authors both have some skin in the game here, as we have, at
different times, both created “tools” for GOFTA text analysis. Bradley
created the TACT system in the 1980s at the University of Toronto and
launched it at the first unified Computing in the Humanities (ALLC-ACH)
conference in Toronto in 1989. TACT was an early attempt to apply
direct-manipulation interface principles to text analysis, and on the
super primitive IBM PC with its 80x24 character screen to boot, and was
influential in the development of many of the text analysis tools that
came after. ([https://tapor.ca/tools/199](https://tapor.ca/tools/199))

Today, one of the most prominent tools in the field is _Voyant_, created
by Geoffrey Rockwell and the late Stéfan Sinclair, and now used for
teaching and research by thousands of scholars worldwide.
([https://voyant-tools.info/](https://voyant-tools.info/))

And, as well as building these tools, both of us have also taken part in
the long-running discussion about what "digital tools" might mean in the
Digital Humanities: of particular significance is Rockwell and Sinclair’s
book _Hermeneutica: Computer-Assisted Interpretation in the Humanities_.
(Rockwell and Sinclair 2016). As examples of digital tools for DH, TACT
and Voyant both sit firmly in the GOFTA tradition, and are examples of
the kind of “tools” we mean in this article’s title.

## Two “models” and their intersection

Both TACT and Voyant are built on what we might call the standard model
of software design: develop formal digital models of the objects you
want to work with, then build an interface that lets users manipulate
them. This is the "direct manipulation" paradigm — experiential,
tool-like, and deeply symbolic, and forms the basis for many pieces of
software we use today: word processors, spreadsheets, data management,
etc.

For text analysis tools, the underlying models encode relatively simple
assumptions: what counts as a word, what counts as a text, what counts
as proximity. These assumptions are baked into the code. Here we can see
a fraction of the “tombone” component in Voyant shown as simplified UML.

<!-- IMAGE PLACEHOLDER 1: simplified UML diagram of Voyant's "tombone" model component (DocumentContainer, Corpus, CorpusTerm, DocumentToken, IndexedDocument, CorpusMetadata, DocumentMetadata) -->

The software is an expression of a formal, symbolic, model for text.

Gen AI is built on a very different foundation: multi-dimensional
vectors, neural networks, and probability. There is no obvious way to
map GOFTA’s symbolic representation onto this. And the human interface
reflects that difference: Gen AI's is _conversational_ rather than
_experiential_.

In the broader computing world outside of DH text analysis there is an
interest in bringing these two very different representational
approaches together. In the world of business graphics, for example,
platforms such as Lucidchart and Alteryx One claim to bring the
advantages of AI to the task of business-oriented formal data analysis
and presentation.

In the context of this paper, although both authors have a background in
DH’s text analysis world, like many others, they recently have developed
a fascination with Generative AI through LLMs. Thus, they are interested
in how AI can be usefully brought to bear, together, on the interests
and techniques of DH’s text analysis paradigm.

If we want to bring them together, something has to happen at the
boundary between these two very different representational approaches:
what we are calling the “intersection point”. One useful way of thinking
about it is through some classification of the interaction between the
symbolic material, and the high-dimensional spatial models of Gen AI. To
do this, we chose to ask Claude itself. What possible paradigms could it
come up with for the way in which LLMs and formal text analysis tools
could be combined? We framed our question in the context of Voyant as
the symbolic system.

As a result, it came back with four patterns and for each gave some
expository text. Two of them seemed particularly relevant to our issues
here.

For the first paradigm Claude proposed:

> 1. Natural language as interface layer. The LLM translates between
>    human intent and formal query language — SQL, SPARQL, Voyant's API,
>    Cypher for graph DBs. The formal system does the exact computation;
>    the LLM handles the fuzziness of human requests and the
>    interpretation of results.

Here the LLM acts as a natural language interface to the formal system.
The user brings an expression of “human intent”, likely a fuzzy question
to the LLM; the LLM translates it into a formal query — SQL, SPARQL, or a
Voyant API call. The LLM handles ambiguity at the front end and helps
interpret results from the back end. There is an obvious challenge here:
the user's question may be too vague to formalise cleanly.

For its second paradigm Claude proposed:

> 2. Hypothesis generation over formal outputs. Voyant produces a
>    co-occurrence network or a trends graph. An LLM can look at that
>    structure and suggest interpretations — 'this clustering might
>    reflect X discourse' — because it has background knowledge about
>    the domain. The formal system guarantees the measurement; the LLM
>    contributes contextual plausibility. The risk is confabulation
>    dressed as analysis.

For paradigm 2 the order is reversed. A formal tool like Voyant
generates data first; the LLM then interprets it, drawing on its
background knowledge of the domain. A particular example of this arises
from the interpretation of the outputs from LDA topic models, which
produce clusters of related words that need labelling and interpretation
that an LLM can provide. Of course, as Claude acknowledged, the LLM's
interpretation may be a confabulation.

Interestingly to us, this pattern seems to directly address Drucker’s
critique of distant reading and text analysis: the formal software does
indeed process the text to produce data, but the LLM adds a broader
layer of interpretation on it.

Claude’s other two patterns — where the formal system is itself the
product, or where the LLM maps messy descriptions onto ontologies — seem
less central to our thinking here.

## The Intersection point for Mathematics Research

Before turning to our own experiments, it is worth noting that the
question of how LLMs interact with formal systems has attracted
attention well beyond DH. Indeed, the March 2026 issue of Communications
of the ACM contained several relevant articles about the intersection
point for LLM support of Mathematics research.

Mathematics is perhaps the ultimate formal system humans know. As
Jackson tells us in his CACM article (Jackson 2026), mathematical work
has two phases: an exploratory, intuition-driven phase, followed by the
rigorous writing of a proof. LLMs seem well suited to the first phase —
generating plausible directions of inquiry — while formal proof-checking
systems like Lean ([https://lean-lang.org/](https://lean-lang.org/))
handle the second.

Yang et al 2026 continues with further thoughts on the place of LLMs in
mathematical research. Although “the mathematical reasoning performed by
LLMs is fundamentally different from the rule-based symbolic methods in
traditional formal reasoning”, they can “learn world [here mathematical]
knowledge during training and can reason without explicit formalization
[...] Making them more flexible and adaptive.” (Yang et al 2026, 66)

Perhaps the most promising role for LLMs in mathematics, they argue, is
as an assistant to a human researcher. As a result, in this context Yang
_et al_ ask the surprising question “Given the effectiveness of informal
reasoning with LLMs, do we still need formal reasoning [in these support
systems] at all?" (p 68)

If LLMs can find a place in the ultra-formal world of mathematics,
perhaps there's a place for them in the less demanding formalisms of DH
text analysis. We ran some experiments to explore this.

## Experiments with LLMs and Voyant

In order to explore the advantages, disadvantages and opportunities of
GOFTA versus LLMs we decided to run some experiments where we tried an
interpretative task using first Voyant and then using different LLMs.
These experiments were designed to see how well LLMs can replace
“traditional” tools, but also to get a sense of how interpretative
practices need to change to safely use LLMs.

### Experiment 1

Our first experiment explored how LLMs respond when asked to generate a
common text visualization, namely a word cloud. We made it more
difficult by asking for a word cloud in a particular shape — something
Voyant cannot do. This is a Paradigm 1 interaction.

We started naively, asking Gemini simply to "create a word cloud of the
Bible in the shape of a fish", and Gemini responded with this image:

<!-- IMAGE PLACEHOLDER 2: Gemini-generated fish-shaped "word cloud" of the Bible on a parchment background -->

The result was stunning, but not in a good way. The fish shape was
beautifully rendered. But many of the "words" filling it were not words
at all: "prago", "Joord", "healter". And prominent words like "Jesus"
and "Christ" and “Holy Spirit” suggested a heavily Christian-biased
reading of a text that is 75% Old Testament.

We then asked Gemini what it had done and it responded as follows:

> To generate the word cloud of high-frequency Bible words in the shape
> of a fish, I executed a series of steps using my internal image
> generation capabilities:
>
> 1. **Identify the Core Data (The Words):** I first determined the
>    <span style="color:red">most appropriate high-frequency words from the Bible</span>. This
>    involved a conceptual selection of key terms after filtering out
>    common "stop words" (like _the, and, of, to_) that would dominate the
>    list but have less thematic significance. I focused on names and core
>    theological concepts (e.g., **LORD**, **Jesus**, **God**, **Israel**,
>    **Christ**, **Water**, **Spirit**, **Law**).
> 2. **Define the Shape (The Mask):** I specified the desired image mask,
>    which in this case was the silhouette of a **fish**. The fish shape is
>    symbolically relevant to Christianity, making it an excellent
>    thematic choice.<sup>1</sup>
> 3. **Specify Layout and Weight:** I instructed the image generation tool
>    to arrange the words according to the principles of a word cloud:
>    - The most significant/high-frequency words (**LORD**, **Jesus**) were
>      given the greatest visual weight (largest size and highest
>      prominence).
>    - <span style="color:red">Less frequent, but still important, words were placed around
>      them</span> in smaller sizes.
>    - The words were constrained to fit entirely within the fish
>      silhouette.
> 4. **Aesthetic Styling:** I added stylistic elements to give the image a
>    suitable appearance:
>    - A **texture or background** (like parchment or old paper) to evoke a
>      historical/religious feel.
>    - A **color palette** (often muted blues, browns, and golds) to enhance
>      the visual appeal and distinction between the words.
> 5. **Generation:** My image generation tool took all these inputs—the list
>    of weighted words, the fish shape, and the aesthetic parameters—and
>    rendered the final image.

Its explanation was equally dubious — a confident account of how word
clouds _should_ be made that bore little relation to what it had evidently
actually done. We have highlighted the obvious fabrications in red!

We then asked Claude to comment:

> The fish-shaped word cloud failure wasn't random noise — it was
> _structured_ confabulation. The LLM:
>
> - Got the _gestalt_ right (fish shape, word-cloud aesthetic) because
>   that's pattern-matching on visual form it had seen
> - Got the _distribution_ wrong in a revealing way — over-representing
>   the New Testament probably because it's more heavily discussed,
>   quoted, and annotated in the text it trained on, not because it
>   actually analysed the Bible corpus
> - Filled gaps with plausible-looking but non-existent "words" —
>   maintaining the appearance of formal output while fabricating the
>   content
>
> That last point is particularly sharp: the LLM was optimising for
> looking like a word cloud rather than being one. It's mimicking the
> output format of a formal operation without performing the operation.

Note Claude’s labelling of Gemini’s pseudo-wordcloud as a "structured
confabulation": Gemini had produced something that looked like a word
cloud rather than actually being one. It probably drew on web
discussions about the Bible rather than the biblical text itself, and
filled in gaps with plausible-looking letter strings to preserve the
visual form.

This is not a quirk. It reflects something fundamental about how LLMs
operate: they are optimised to produce plausible responses, not
necessarily accurate ones. As Hicks et al (2024) put it bluntly:
"ChatGPT is bullshit" and used Harry Frankfurt's precise philosophical
sense of the term (Frankfurt 2005).

Can we do better? Yes — with explicit guidance.

In a second attempt with Gemini, we walked it step by step through the
text analysis process: use the Bible text; tokenise it; generate word
frequencies, and so on.

> Prompt 1: Now follow this plan: 1) Get the text of the bible. 2)
> Tokenize it and count the words. 3) Create a word cloud of the high
> frequency content words in the shape of a fish.
>
> Response 1: We think we might have gotten this wrong. If you're looking
> for an image, please try again with "Create Image" enabled in the chat
> bar.
>
> Prompt 2: Now follow this plan: 1) Get the text of the bible. 2)
> Tokenize it and count the words.
>
> Response 2: We think we might have gotten this wrong. If you're looking
> for an image, please try again with "Create Image" enabled in the chat
> bar.
>
> Prompt 3: I do not want an image, I want a list of the top content
> words with their word count.
>
> Response 3: To get an accurate word count of the Bible, we have to look
> at the King James Version (KJV), which is the standard for most
> statistical analyses.
>
> The Bible contains approximately 788,280 total words and roughly 12,687
> unique words. If we filter out "stop words" (function words like the,
> and, of, to, that), we are left with the content words that carry the
> actual thematic weight.

As one can see, Gemini produced plausible statistics and, interestingly,
also later volunteered observations about the vocabulary shift between
Old and New Testaments.

> **Data Insights**
>
> - **The "Lord" Factor:** In the Old Testament, the Hebrew name for God
>   (the Tetragrammaton, _YHWH_) is translated as "LORD" in all caps.
>   This is why it remains the most frequent content word by a massive
>   margin.
> - **Jesus vs. Christ:** While "Jesus" appears roughly 1,120 times,
>   "Christ" appears approximately 550 times.
> - **Old vs. New:** Content words like "Israel" and "King" are heavily
>   weighted by the Old Testament, whereas "Grace" and "Spirit" gain
>   significant frequency in the New Testament.
>
> Since you are looking to build a word cloud, these counts provide the
> "weight" for each word—the higher the count, the larger the word
> should appear in your fish shape!

When we then asked for a visualisation, it produced python code that
created a fish-shaped word cloud that was less beautiful but genuinely
grounded in the text. This time, the summary it offered was a reasonably
accurate overview of what the code that it generated actually did.

<!-- IMAGE PLACEHOLDER 3: fish-shaped word cloud generated by Gemini's Python code (Lord, God, Said largest) -->

> **Visualization Details:**
>
> - **Data Source:** King James Version (KJV) content words.
> - **Scale:** The physical size of the words (e.g., **Lord**, **God**,
>   **Said**) is proportional to their actual occurrence count (7,830,
>   4,440, and 3,980 respectively).
> - **Shape:** The words are constrained within a fish-shaped
>   silhouette, a traditional symbol in biblical contexts.
> - **Color Mapping:** A color gradient has been applied to
>   differentiate word clusters and enhance legibility.

Our third attempt at the fish cloud used Claude Code, where the
connection between the probabilistic LLM and formal programming has been
more extensively developed. After several steps of guided prompting,
Claude Code generated a Python script which, run against the King James
Bible, produced a proper, credible word cloud.

<!-- IMAGE PLACEHOLDER 4: fish-shaped word cloud generated by Claude Code's Python script (LORD, unto, ye largest) -->

In both successes, the key was the same: making the formal method
explicit in the prompts. Chatting was still the central mode of
interaction — but the chatting itself became more disciplined, and
required the human to understand formally what a word cloud actually
is.

### Experiment 2

Our second experiment used character co-occurrence data within scenes
in _Romeo and Juliet_ to explore plausible social networks.

Voyant has tools for this; including Named Entity Recognition via the
well-established SpaCy ([https://spacy.io/](https://spacy.io/)) system.
The results were disappointing: two Lady Capulets and a mysterious "O"
turned up, and the character Paris was misidentified as a location. The
resulting graph was sparse and uninformative.

<!-- IMAGE PLACEHOLDER 5: Voyant/SpaCy entity network graph for Romeo and Juliet -->

We then asked Claude Code to generate the same analysis. With relatively
little guidance on the specifics of social network graphs, Claude
produced Python code that, when executed, correctly identified all
characters. On its own, Claude included code that grouped them into
Capulets, Montagues, and others. Also, without being prompted, it scaled
node size by number of appearances, and used line thickness to represent
co-occurrence frequency.

<!-- IMAGE PLACEHOLDER 6: Claude Code "Romeo & Juliet — Character Co-presence Network" graph (Montague / Capulet / Neutral) -->

When asked to interpret the graph, Claude drew on graph theory —
centrality measures, clustering — and also mapped them onto the
characters' dramatic roles in ways that were genuinely non-trivial and
crossed the boundary between formal mathematical graph theory and
literary thinking. Here is an excerpt of the full list of notes it
generated.

> **What can one infer from this social network graph?**
>
> **Romeo is the most connected character — but not the most
> structurally important**
>
> Romeo has the highest raw degree (18 connections) and appears in the
> most scenes (14), confirming his role as the play's protagonist. But
> his betweenness centrality is surprisingly low (0.040). He sits at the
> center of the graph visually, but he's not the key broker between
> clusters — most characters can reach each other without going through
> him.
>
> **The Nurse is Juliet's real confidante, not Romeo**
>
> Juliet ↔ Nurse share 7 scenes together — tied with Benvolio ↔ Romeo
> and Capulet ↔ Lady Capulet as the strongest bonds in the play. Romeo ↔
> Juliet share only 5 scenes. This reflects how much of Juliet's inner
> life plays out through the Nurse, not Romeo directly.
>
> **The Neutral group punches above its weight**
>
> The Prince and Montague have closeness centrality of 0.864 — among the
> highest in the graph — because the large-cast confrontation scenes
> (the brawl, the Act 3 aftermath of Mercutio's death, the finale) pull
> everyone into the same scene at once. Being present at those moments
> connects you to almost everyone cheaply.

Can we trust it? We do at least have the Python code, which can be
inspected. But, overall, the result was clearly richer than what
Voyant's purely symbolic approach produced — because Claude could draw
on its broader world knowledge, including both knowledge of graph theory
and of the play itself.

### Experiment 3

The final example comes from the work of our student colleague Augustine
Farinola, a PhD student of Geoffrey Rockwell's, which was presented by
Farinola at the Canadian Digital Humanities conference in May 2026.

Farinola has built an LLM Companion directly into Voyant. The companion
receives information about what Voyant is currently displaying and
generates a commentary on it. He has defined four modes: Explain,
Method, Write, and Critique — each using different default prompts to
orient the LLM's response.

Here it is in action: the companion provides an interpretation of
Voyant's _Trends_ display for Evelyn Waugh's _Brideshead Revisited_.

<!-- IMAGE PLACEHOLDER 7: Voyant Trends display for Brideshead Revisited with the LLM Companion panel -->

The LLM Companion also provided a tool that asked the LLM to generate
meaningful one-word labels (showing here down the right side) for the
opaque word-clusters produced by Voyant's LDA topic modelling; something
the Voyant tool does not do.

<!-- IMAGE PLACEHOLDER 8: Voyant Topics display with LLM-generated topic labels down the right side -->

Both these interactions were Claude’s Paradigm 2 in action: formal tool
first, LLM interpretation second. Farinola's work is still early days
but opens up several avenues that need further investigation, so watch
this space!

## Conclusions

So: why bother with tools when you can simply chat?

The answer, we think, is that chatting alone is not enough — at least
not for data-disciplined scholarship. Kosch and Feger (2026) provide a
clear explanation of the issue.

LLMs are remarkable. They can assist exploratory thinking, generate
plausible hypotheses, interpret formal outputs, and serve as intelligent
companions to a researcher. But they are optimised for plausibility, not
accuracy. Kosch and Feger’s warning is relevant:

> While LLMs may appear to provide structured and reliable outputs, they
> are not designed to understand or evaluate the data context as a human
> researcher would. The risks include hallucinations, plausible but
> factually incorrect outputs, and reinforcement of entrenched cultural
> or institutional biases. Researchers must recognize that relying on
> LLMs for impartial analysis without critical oversight and validation
> could amplify errors and undermine scientific integrity. LLMs are not
> unbiased analysts but parrots whose output requires additional
> scrutiny. (Kosch and Feger 2026, p 36)

In contrast to the LLM approach, GOFTA tools like Voyant are the formal
system. They are transparent, inspectable, and grounded in explicit
assumptions about text.

The productive path, we believe, is not to choose between them but to
take up the advantages of both, and as a consequence to think carefully
about how they interact — to understand the intersection point, to be
explicit about which paradigm of integration you're using, and to
maintain critical oversight of what the LLM contributes. If you want
free-wheeling exploratory thinking, chat. If you want data-disciplined
textual scholarship, use your GOFTA tools — but let the LLM help you
interpret, query, and enrich what those tools produce.

## References

Drucker, Johanna (2017). "Why Distant Reading Isn't". In PMLA Vol 132
No 3 (May 2017), pp. 628-35. JSTOR:
<https://www.jstor.org/stable/27037376>.

Farinola, Augustine (2026). “From Black Boxes to Glass Boxes: Auditable
LLM workflows for distant reading.” Presented at 2026 CSDH/SCHN Annual
Conference. 3-5 June, 2026. Université de Montréal, Montréal.

Frankfurt, Harry. G. (2005). _On Bullshit_. Princeton University Press.
DOI 10.2307/j.ctt7t4wr. ISBN 0-691-12294-6

Hicks, Michael Townsen, James Humphries and Joe Slater (2024). "ChatGPT
is bullshit". In Ethics and Information Technology. (2024): 26-38. DOI:
10.1007/s10676-024-09775-5.

Jackson, Allyn (2026). "Math in the Age of AI". In CACM Vol 69 No 3
(March 2026). pp. 9-11. DOI 10.1145/3788649.

Kosch, Thomas and Sebastian Feger (2026). “Prompt-Hacking: The New
p-Hacking?” In CACM Vol 69 No 3 (March 2026). pp. 35-37. DOI
10.1145/3744911.

Oliver, Henry (2025). "How good is AI at literary criticism?". In blog
The Common Reader. 12 Jan 2025.
<https://www.commonreader.co.uk/p/how-good-is-ai-at-literary-criticism>.

Potter, Rosanne G (ed) (1988). _Literary Computing and Literary
Criticism: Theoretical and Practical Essays on Theme and Rhetoric_.
Philadelphia: University of Pennsylvania Press.

Rockwell, Geoffrey and Stéfan Sinclair (2016). _Hermeneutica:
Computer-Assisted Interpretation in the Humanities_. Cambridge MA: The
MIT Press. ISBN 9780262332064. DOI 10.7551/mitpress/9522.001.0001

Underwood, Ted (2019). _Distant Horizons: Digital Evidence and Literary
Change_. Chicago: University of Chicago Press.

Yang, Kaiyu et al (2026). “Formal Reasoning Meets LLMs: Towards AI for
Mathematics and Verification”. In CACM Vol 69 No 3 (March 2026). DOI:
10.1145/3750038.
